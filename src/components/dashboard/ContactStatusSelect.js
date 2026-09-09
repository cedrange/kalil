"use client";

import { useTransition } from "react";
import { updateContactStatus } from "@/app/actions/contacts";
import { CONTACT_STATUSES } from "@/lib/constants";

export default function ContactStatusSelect({ id, status }) {
  const [isPending, startTransition] = useTransition();

  return (
    <select
      defaultValue={status}
      disabled={isPending}
      onChange={(e) => startTransition(() => updateContactStatus(id, e.target.value))}
      className="rounded-md border border-border bg-white px-2 py-1 text-xs font-semibold text-ink-soft"
    >
      {CONTACT_STATUSES.map((s) => (
        <option key={s.value} value={s.value}>{s.label}</option>
      ))}
    </select>
  );
}
