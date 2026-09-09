import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { deleteContactMessage } from "@/app/actions/contacts";
import DeleteButton from "@/components/dashboard/DeleteButton";
import ContactStatusSelect from "@/components/dashboard/ContactStatusSelect";
import { CONTACT_STATUSES, formatDate } from "@/lib/constants";

export default async function DashboardContactsPage({ searchParams }) {
  const { status } = await searchParams;

  const messages = await prisma.contactMessage.findMany({
    where: status ? { status } : undefined,
    include: { property: { select: { title: true, slug: true } } },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-ink">Messages de contact</h1>
          <p className="mt-1 text-ink-soft">{messages.length} message(s)</p>
        </div>

        <div className="flex gap-2">
          <Link
            href="/dashboard/contacts"
            className={`rounded-md border px-3 py-1.5 text-sm font-medium ${
              !status ? "border-primary bg-primary-soft text-primary-dark" : "border-border text-ink-soft"
            }`}
          >
            Tous
          </Link>
          {CONTACT_STATUSES.map((s) => (
            <Link
              key={s.value}
              href={`/dashboard/contacts?status=${s.value}`}
              className={`rounded-md border px-3 py-1.5 text-sm font-medium ${
                status === s.value ? "border-primary bg-primary-soft text-primary-dark" : "border-border text-ink-soft"
              }`}
            >
              {s.label}
            </Link>
          ))}
        </div>
      </div>

      <div className="mt-6 flex flex-col gap-4">
        {messages.map((m) => (
          <div key={m.id} className="rounded-xl border border-border bg-white p-5">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="font-semibold text-ink">{m.name}</p>
                <p className="text-sm text-ink-soft">
                  <a href={`mailto:${m.email}`} className="hover:text-primary">{m.email}</a>
                  {m.phone && <> · <a href={`tel:${m.phone}`} className="hover:text-primary">{m.phone}</a></>}
                  {m.country && <> · {m.country}</>}
                </p>
                {m.property && (
                  <Link
                    href={`/dashboard/properties`}
                    className="mt-1 inline-block text-xs font-semibold text-accent-dark"
                  >
                    Concerne : {m.property.title}
                  </Link>
                )}
              </div>

              <div className="flex items-center gap-3">
                <span className="text-xs text-ink-soft">{formatDate(m.createdAt)}</span>
                <ContactStatusSelect id={m.id} status={m.status} />
                <DeleteButton
                  action={deleteContactMessage.bind(null, m.id)}
                  confirmText="Supprimer ce message ?"
                />
              </div>
            </div>

            <p className="mt-3 whitespace-pre-line text-sm text-ink-soft">{m.message}</p>
          </div>
        ))}

        {messages.length === 0 && (
          <p className="rounded-xl border border-dashed border-border bg-white p-8 text-center text-ink-soft">
            Aucun message pour le moment.
          </p>
        )}
      </div>
    </div>
  );
}
