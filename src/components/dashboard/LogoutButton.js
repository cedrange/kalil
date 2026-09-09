"use client";

import { useTransition } from "react";
import { logout } from "@/app/actions/auth";

export default function LogoutButton({ className }) {
  const [isPending, startTransition] = useTransition();

  return (
    <button
      type="button"
      disabled={isPending}
      onClick={() => startTransition(() => logout())}
      className={className}
    >
      {isPending ? "Déconnexion..." : "Se déconnecter"}
    </button>
  );
}
