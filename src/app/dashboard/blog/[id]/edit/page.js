import { notFound } from "next/navigation";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import PostForm from "@/components/dashboard/PostForm";
import DeleteButton from "@/components/dashboard/DeleteButton";
import { updatePost, deletePost } from "@/app/actions/blog";

export default async function EditPostPage({ params }) {
  const { id: idParam } = await params;
  const id = Number(idParam);

  const post = await prisma.blogPost.findUnique({ where: { id } });
  if (!post) notFound();

  const boundAction = updatePost.bind(null, id);

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-ink">Modifier l&apos;article</h1>
          {post.published && (
            <Link href={`/blog/${post.slug}`} target="_blank" className="mt-1 inline-block text-sm text-primary hover:underline">
              Voir l&apos;article en ligne →
            </Link>
          )}
        </div>
        <DeleteButton action={deletePost.bind(null, id)} confirmText={`Supprimer « ${post.title} » ?`} />
      </div>

      <div className="mt-6 max-w-3xl">
        <PostForm action={boundAction} post={post} />
      </div>
    </div>
  );
}
