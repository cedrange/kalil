import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { formatDate } from "@/lib/constants";

export const metadata = {
  title: "Blog — Conseils immobilier pour la diaspora guinéenne",
  description:
    "Conseils, guides et actualités pour accompagner la diaspora guinéenne dans ses projets immobiliers en Guinée.",
};

export default async function BlogPage() {
  const posts = await prisma.blogPost.findMany({
    where: { published: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="container-page py-12">
      <div className="max-w-2xl">
        <h1 className="text-3xl font-bold text-ink">Le blog Kalil Immo</h1>
        <p className="mt-2 text-ink-soft">
          Guides pratiques, conseils juridiques et actualités du marché
          immobilier guinéen pour vous accompagner depuis l&apos;Europe.
        </p>
      </div>

      {posts.length === 0 ? (
        <p className="mt-10 text-ink-soft">Aucun article publié pour le moment.</p>
      ) : (
        <div className="mt-10 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <Link
              key={post.id}
              href={`/blog/${post.slug}`}
              className="group flex flex-col overflow-hidden rounded-xl border border-border bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
            >
              {post.coverImage && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={post.coverImage}
                  alt={post.title}
                  className="aspect-[16/10] w-full object-cover"
                />
              )}
              <div className="flex flex-1 flex-col gap-2 p-5">
                <p className="text-xs font-semibold uppercase tracking-wide text-accent-dark">
                  {formatDate(post.createdAt)}
                </p>
                <h2 className="font-semibold text-ink group-hover:text-primary">
                  {post.title}
                </h2>
                {post.excerpt && (
                  <p className="line-clamp-3 text-sm text-ink-soft">{post.excerpt}</p>
                )}
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
