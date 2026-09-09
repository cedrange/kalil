import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { deleteProperty } from "@/app/actions/properties";
import DeleteButton from "@/components/dashboard/DeleteButton";
import { formatPrice, propertyTypeLabel } from "@/lib/constants";

export default async function DashboardPropertiesPage() {
  const properties = await prisma.property.findMany({
    include: { images: { take: 1, orderBy: { position: "asc" } }, _count: { select: { contacts: true } } },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-ink">Biens immobiliers</h1>
          <p className="mt-1 text-ink-soft">{properties.length} bien(s) au total</p>
        </div>
        <Link
          href="/dashboard/properties/new"
          className="rounded-md bg-primary px-4 py-2 text-sm font-semibold text-white hover:bg-primary-dark"
        >
          + Nouveau bien
        </Link>
      </div>

      <div className="mt-6 overflow-x-auto rounded-xl border border-border bg-white">
        <table className="w-full min-w-[720px] text-left text-sm">
          <thead className="border-b border-border bg-primary-soft text-xs uppercase text-ink-soft">
            <tr>
              <th className="px-4 py-3">Bien</th>
              <th className="px-4 py-3">Type</th>
              <th className="px-4 py-3">Ville</th>
              <th className="px-4 py-3">Prix</th>
              <th className="px-4 py-3">Statut</th>
              <th className="px-4 py-3">Demandes</th>
              <th className="px-4 py-3"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {properties.map((p) => (
              <tr key={p.id}>
                <td className="px-4 py-3 font-medium text-ink">
                  <Link href={`/dashboard/properties/${p.id}/edit`} className="hover:text-primary">
                    {p.title}
                  </Link>
                  {p.featured && (
                    <span className="ml-2 rounded-full bg-accent/20 px-2 py-0.5 text-xs font-semibold text-accent-dark">
                      À la une
                    </span>
                  )}
                </td>
                <td className="px-4 py-3 text-ink-soft">{propertyTypeLabel(p.type)}</td>
                <td className="px-4 py-3 text-ink-soft">{p.city}</td>
                <td className="px-4 py-3 text-ink-soft">{formatPrice(p.price, p.currency)}</td>
                <td className="px-4 py-3">
                  <span className="rounded-full bg-primary-soft px-2 py-1 text-xs font-semibold text-primary-dark">
                    {p.status}
                  </span>
                </td>
                <td className="px-4 py-3 text-ink-soft">{p._count.contacts}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center justify-end gap-4">
                    <Link href={`/dashboard/properties/${p.id}/edit`} className="text-sm font-medium text-primary hover:underline">
                      Modifier
                    </Link>
                    <DeleteButton
                      action={deleteProperty.bind(null, p.id)}
                      confirmText={`Supprimer « ${p.title} » ? Cette action est irréversible.`}
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {properties.length === 0 && (
          <p className="p-8 text-center text-ink-soft">Aucun bien pour le moment.</p>
        )}
      </div>
    </div>
  );
}
