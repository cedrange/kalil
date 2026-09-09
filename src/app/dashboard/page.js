import Link from "next/link";
import { prisma } from "@/lib/prisma";

export default async function DashboardHome() {
  const [propertiesCount, publishedProperties, postsCount, newContacts, totalContacts] =
    await Promise.all([
      prisma.property.count(),
      prisma.property.count({ where: { status: "disponible" } }),
      prisma.blogPost.count(),
      prisma.contactMessage.count({ where: { status: "nouveau" } }),
      prisma.contactMessage.count(),
    ]);

  const recentContacts = await prisma.contactMessage.findMany({
    orderBy: { createdAt: "desc" },
    take: 5,
    include: { property: { select: { title: true } } },
  });

  const stats = [
    { label: "Biens publiés", value: propertiesCount, href: "/dashboard/properties" },
    { label: "Biens disponibles", value: publishedProperties, href: "/dashboard/properties" },
    { label: "Articles de blog", value: postsCount, href: "/dashboard/blog" },
    { label: "Nouveaux messages", value: newContacts, href: "/dashboard/contacts" },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold text-ink">Aperçu</h1>
      <p className="mt-1 text-ink-soft">
        Bienvenue dans l&apos;espace d&apos;administration de Kalil Immo.
      </p>

      <div className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
        {stats.map((s) => (
          <Link
            key={s.label}
            href={s.href}
            className="rounded-xl border border-border bg-white p-5 transition hover:border-primary"
          >
            <p className="text-3xl font-bold text-primary-dark">{s.value}</p>
            <p className="mt-1 text-sm text-ink-soft">{s.label}</p>
          </Link>
        ))}
      </div>

      <div className="mt-10 rounded-xl border border-border bg-white p-6">
        <div className="flex items-center justify-between">
          <h2 className="font-semibold text-ink">
            Derniers messages ({totalContacts} au total)
          </h2>
          <Link href="/dashboard/contacts" className="text-sm font-semibold text-primary hover:underline">
            Voir tout →
          </Link>
        </div>

        {recentContacts.length === 0 ? (
          <p className="mt-4 text-sm text-ink-soft">Aucun message pour le moment.</p>
        ) : (
          <ul className="mt-4 divide-y divide-border">
            {recentContacts.map((c) => (
              <li key={c.id} className="flex items-center justify-between gap-4 py-3">
                <div className="min-w-0">
                  <p className="truncate font-medium text-ink">
                    {c.name}
                    {c.property ? (
                      <span className="font-normal text-ink-soft"> — {c.property.title}</span>
                    ) : null}
                  </p>
                  <p className="truncate text-sm text-ink-soft">{c.message}</p>
                </div>
                <span
                  className={`shrink-0 rounded-full px-3 py-1 text-xs font-semibold ${
                    c.status === "nouveau"
                      ? "bg-accent/20 text-accent-dark"
                      : "bg-primary-soft text-primary-dark"
                  }`}
                >
                  {c.status}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
