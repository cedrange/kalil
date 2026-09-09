"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import slugify from "slugify";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";
import { saveUploadedFiles } from "@/lib/upload";

async function requireSession() {
  const session = await getSession();
  if (!session) throw new Error("Non autorisé");
}

function slug(text) {
  return slugify(text, { lower: true, strict: true, locale: "fr" });
}

async function uniqueSlug(base, excludeId) {
  let candidate = slug(base) || `article-${Date.now()}`;
  let n = 1;
  while (
    await prisma.blogPost.findFirst({
      where: { slug: candidate, ...(excludeId ? { NOT: { id: excludeId } } : {}) },
    })
  ) {
    n += 1;
    candidate = `${slug(base)}-${n}`;
  }
  return candidate;
}

function readPostForm(formData) {
  return {
    title: formData.get("title")?.toString().trim(),
    excerpt: formData.get("excerpt")?.toString().trim() || null,
    content: formData.get("content")?.toString() || "",
    published: formData.get("published") === "on",
  };
}

export async function createPost(prevState, formData) {
  await requireSession();

  const data = readPostForm(formData);
  if (!data.title || !data.content) {
    return { error: "Le titre et le contenu sont obligatoires." };
  }

  const coverFile = formData.get("coverImage");
  const [coverUrl] = await saveUploadedFiles([coverFile], "blog");

  const post = await prisma.blogPost.create({
    data: {
      ...data,
      slug: await uniqueSlug(data.title),
      coverImage: coverUrl || null,
    },
  });

  revalidatePath("/dashboard/blog");
  revalidatePath("/blog");
  redirect(`/dashboard/blog/${post.id}/edit`);
}

export async function updatePost(id, prevState, formData) {
  await requireSession();

  const data = readPostForm(formData);
  if (!data.title || !data.content) {
    return { error: "Le titre et le contenu sont obligatoires." };
  }

  const existing = await prisma.blogPost.findUnique({ where: { id } });
  if (!existing) return { error: "Article introuvable." };

  const coverFile = formData.get("coverImage");
  const [coverUrl] = await saveUploadedFiles([coverFile], "blog");

  await prisma.blogPost.update({
    where: { id },
    data: {
      ...data,
      slug: data.title !== existing.title ? await uniqueSlug(data.title, id) : existing.slug,
      coverImage: coverUrl || existing.coverImage,
    },
  });

  revalidatePath("/dashboard/blog");
  revalidatePath("/blog");
  revalidatePath(`/blog/${existing.slug}`);

  return { error: null, success: true };
}

export async function deletePost(id) {
  await requireSession();
  await prisma.blogPost.delete({ where: { id } });
  revalidatePath("/dashboard/blog");
  revalidatePath("/blog");
  redirect("/dashboard/blog");
}
