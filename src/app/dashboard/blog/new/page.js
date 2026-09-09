import PostForm from "@/components/dashboard/PostForm";
import { createPost } from "@/app/actions/blog";

export default function NewPostPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-ink">Nouvel article</h1>
      <p className="mt-1 text-ink-soft">Rédigez un article pour le blog.</p>

      <div className="mt-6 max-w-3xl">
        <PostForm action={createPost} />
      </div>
    </div>
  );
}
