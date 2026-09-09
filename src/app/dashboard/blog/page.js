import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { deletePost } from "@/app/actions/blog";
import DeleteButton from "@/components/dashboard/DeleteButton";
import { formatDate } from "@/lib/constants";

export default async function DashboardBlogPage() {
  const posts = await prisma.blogPost.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-ink">Articles de blog</h1>
          <p className="mt-1 text-ink-soft">{posts.length} article(s) au total</p>
        </div>
        <Link
          href="/dashboard/blog/new"
          className="rounded-md bg-primary px-4 py-2 text-sm font-semibold text-white hover:bg-primary-dark"
        >
          + Nouvel article
        </Link>
      </div>

      <div className="mt-6 overflow-x-auto rounded-xl border border-border bg-white">
        <table className="w-full min-w-[600px] text-left text-sm">
          <thead className="border-b border-border bg-primary-soft text-xs uppercase text-ink-soft">
            <tr>
              <th className="px-4 py-3">Titre</th>
              <th className="px-4 py-3">Date</th>
              <th className="px-4 py-3">Statut</th>
              <th className="px-4 py-3"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {posts.map((post) => (
              <tr key={post.id}>
                <td className="px-4 py-3 font-medium text-ink">
                  <Link href={`/dashboard/blog/${post.id}/edit`} className="hover:text-primary">
                    {post.title}
                  </Link>
                </td>
                <td className="px-4 py-3 text-ink-soft">{formatDate(post.createdAt)}</td>
                <td className="px-4 py-3">
                  <span
                    className={`rounded-full px-2 py-1 text-xs font-semibold ${
                      post.published ? "bg-primary-soft text-primary-dark" : "bg-ink/10 text-ink-soft"
                    }`}
                  >
                    {post.published ? "Publié" : "Brouillon"}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center justify-end gap-4">
                    <Link href={`/dashboard/blog/${post.id}/edit`} className="text-sm font-medium text-primary hover:underline">
                      Modifier
                    </Link>
                    <DeleteButton
                      action={deletePost.bind(null, post.id)}
                      confirmText={`Supprimer « ${post.title} » ?`}
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {posts.length === 0 && (
          <p className="p-8 text-center text-ink-soft">Aucun article pour le moment.</p>
        )}
      </div>
    </div>
  );
}
