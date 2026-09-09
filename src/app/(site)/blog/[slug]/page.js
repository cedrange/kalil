import { notFound } from "next/navigation";
import Link from "next/link";
import { marked } from "marked";
import { prisma } from "@/lib/prisma";
import { formatDate } from "@/lib/constants";

async function getPost(slug) {
  return prisma.blogPost.findUnique({ where: { slug } });
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt ?? post.content.slice(0, 155),
  };
}

export default async function BlogPostPage({ params }) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post || !post.published) notFound();

  const html = marked.parse(post.content ?? "");

  return (
    <article className="container-page py-12">
      <nav className="text-sm text-ink-soft">
        <Link href="/blog" className="hover:text-primary">Blog</Link>
        <span className="mx-2">/</span>
        <span>{post.title}</span>
      </nav>

      <div className="mx-auto mt-6 max-w-3xl">
        <p className="text-sm font-semibold uppercase tracking-wide text-accent-dark">
          {formatDate(post.createdAt)}
        </p>
        <h1 className="mt-2 text-3xl font-bold text-ink md:text-4xl">{post.title}</h1>

        {post.coverImage && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={post.coverImage}
            alt={post.title}
            className="mt-8 aspect-[16/9] w-full rounded-xl object-cover"
          />
        )}

        <div
          className="prose prose-headings:text-ink prose-p:text-ink-soft prose-strong:text-ink mt-8 max-w-none leading-relaxed"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </div>
    </article>
  );
}
