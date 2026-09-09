"use client";

import { useTransition } from "react";

export default function DeleteButton({ action, confirmText, label = "Supprimer" }) {
  const [isPending, startTransition] = useTransition();

  return (
    <button
      type="button"
      disabled={isPending}
      onClick={() => {
        if (confirm(confirmText ?? "Confirmer la suppression ?")) {
          startTransition(() => action());
        }
      }}
      className="text-sm font-medium text-danger hover:underline disabled:opacity-60"
    >
      {isPending ? "Suppression..." : label}
    </button>
  );
}
