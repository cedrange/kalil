"use client";

import { useActionState } from "react";
import Image from "next/image";

const initialState = { error: null };

export default function PostForm({ action, post }) {
  const [state, formAction, pending] = useActionState(action, initialState);

  return (
    <form action={formAction} className="flex flex-col gap-6">
      <div className="grid gap-4 rounded-xl border border-border bg-white p-6">
        <div className="flex flex-col gap-1">
          <label className="text-xs font-semibold text-ink-soft">Titre *</label>
          <input
            name="title"
            required
            defaultValue={post?.title}
            className="rounded-md border border-border px-3 py-2 text-sm"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-xs font-semibold text-ink-soft">Résumé</label>
          <textarea
            name="excerpt"
            rows={2}
            defaultValue={post?.excerpt ?? ""}
            className="rounded-md border border-border px-3 py-2 text-sm"
            placeholder="Résumé affiché dans la liste des articles"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-xs font-semibold text-ink-soft">
            Contenu * (Markdown supporté : **gras**, listes avec -, titres avec ##)
          </label>
          <textarea
            name="content"
            required
            rows={16}
            defaultValue={post?.content}
            className="rounded-md border border-border px-3 py-2 font-mono text-sm"
          />
        </div>

        <div>
          <label className="flex items-center gap-2 text-sm text-ink-soft">
            <input
              type="checkbox"
              name="published"
              defaultChecked={post?.published ?? true}
              className="h-4 w-4 rounded border-border"
            />
            Publier l&apos;article (visible sur le site)
          </label>
        </div>
      </div>

      <div className="rounded-xl border border-border bg-white p-6">
        <h2 className="text-sm font-semibold text-ink">Image de couverture</h2>
        {post?.coverImage && (
          <div className="relative mt-3 aspect-[16/9] w-64 overflow-hidden rounded-lg border border-border">
            <Image src={post.coverImage} alt="" fill sizes="256px" className="object-cover" />
          </div>
        )}
        <div className="mt-3 flex flex-col gap-1">
          <input type="file" name="coverImage" accept="image/*" className="text-sm" />
          <p className="text-xs text-ink-soft">Laissez vide pour conserver l&apos;image actuelle.</p>
        </div>
      </div>

      {state.error && <p className="text-sm font-medium text-danger">{state.error}</p>}
      {state.success && (
        <p className="text-sm font-medium text-primary">Article enregistré avec succès.</p>
      )}

      <div>
        <button
          type="submit"
          disabled={pending}
          className="rounded-md bg-primary px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-primary-dark disabled:opacity-60"
        >
          {pending ? "Enregistrement..." : "Enregistrer l'article"}
        </button>
      </div>
    </form>
  );
}
