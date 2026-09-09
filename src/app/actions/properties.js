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
  let candidate = slug(base) || `bien-${Date.now()}`;
  let n = 1;
  while (
    await prisma.property.findFirst({
      where: { slug: candidate, ...(excludeId ? { NOT: { id: excludeId } } : {}) },
    })
  ) {
    n += 1;
    candidate = `${slug(base)}-${n}`;
  }
  return candidate;
}

function readPropertyForm(formData) {
  const num = (name) => {
    const v = formData.get(name);
    return v && v.toString().trim() !== "" ? Number(v) : null;
  };

  return {
    title: formData.get("title")?.toString().trim(),
    type: formData.get("type")?.toString(),
    transactionType: formData.get("transactionType")?.toString(),
    status: formData.get("status")?.toString(),
    price: num("price") ?? 0,
    currency: formData.get("currency")?.toString() || "GNF",
    city: formData.get("city")?.toString().trim(),
    neighborhood: formData.get("neighborhood")?.toString().trim() || null,
    surface: num("surface"),
    bedrooms: num("bedrooms"),
    bathrooms: num("bathrooms"),
    description: formData.get("description")?.toString().trim() || "",
    featured: formData.get("featured") === "on",
  };
}

export async function createProperty(prevState, formData) {
  await requireSession();

  const data = readPropertyForm(formData);
  if (!data.title || !data.city) {
    return { error: "Le titre et la ville sont obligatoires." };
  }

  const files = formData.getAll("images");
  const urls = await saveUploadedFiles(files, "properties");

  const property = await prisma.property.create({
    data: {
      ...data,
      slug: await uniqueSlug(data.title),
      images: { create: urls.map((url, i) => ({ url, position: i })) },
    },
  });

  revalidatePath("/dashboard/properties");
  revalidatePath("/showroom");
  redirect(`/dashboard/properties/${property.id}/edit`);
}

export async function updateProperty(id, prevState, formData) {
  await requireSession();

  const data = readPropertyForm(formData);
  if (!data.title || !data.city) {
    return { error: "Le titre et la ville sont obligatoires." };
  }

  const existing = await prisma.property.findUnique({ where: { id } });
  if (!existing) return { error: "Bien introuvable." };

  const removeImageIds = formData
    .getAll("removeImages")
    .map((v) => Number(v))
    .filter((v) => !Number.isNaN(v));

  const files = formData.getAll("images");
  const urls = await saveUploadedFiles(files, "properties");

  const currentImages = await prisma.propertyImage.findMany({
    where: { propertyId: id },
    orderBy: { position: "asc" },
  });
  const maxPosition = currentImages.reduce((m, img) => Math.max(m, img.position), -1);

  await prisma.$transaction([
    ...(removeImageIds.length
      ? [prisma.propertyImage.deleteMany({ where: { id: { in: removeImageIds }, propertyId: id } })]
      : []),
    prisma.property.update({
      where: { id },
      data: {
        ...data,
        slug: data.title !== existing.title ? await uniqueSlug(data.title, id) : existing.slug,
        images: urls.length
          ? { create: urls.map((url, i) => ({ url, position: maxPosition + 1 + i })) }
          : undefined,
      },
    }),
  ]);

  revalidatePath("/dashboard/properties");
  revalidatePath("/showroom");
  revalidatePath(`/showroom/${existing.slug}`);

  return { error: null, success: true };
}

export async function deleteProperty(id) {
  await requireSession();
  await prisma.property.delete({ where: { id } });
  revalidatePath("/dashboard/properties");
  revalidatePath("/showroom");
  redirect("/dashboard/properties");
}
