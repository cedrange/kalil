import Link from "next/link";
import { prisma } from "@/lib/prisma";
import PropertyCard from "@/components/PropertyCard";
import { GUINEA_CITIES, PROPERTY_TYPES, TRANSACTION_TYPES } from "@/lib/constants";

export const metadata = {
  title: "Showroom — Terrains, maisons, appartements et boutiques",
  description:
    "Parcourez notre sélection de biens immobiliers en Guinée : terrains, maisons, appartements, boutiques, à vendre ou à louer.",
};

function buildWhere(params) {
  const where = {};
  if (params.type) where.type = params.type;
  if (params.transaction) where.transactionType = params.transaction;
  if (params.city) where.city = params.city;
  if (params.min || params.max) {
    where.price = {};
    if (params.min) where.price.gte = Number(params.min);
    if (params.max) where.price.lte = Number(params.max);
  }
  return where;
}

export default async function ShowroomPage({ searchParams }) {
  const params = await searchParams;

  const where = buildWhere(params);

  const properties = await prisma.property.findMany({
    where,
    include: { images: { orderBy: { position: "asc" }, take: 1 } },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="container-page py-12">
      <div className="max-w-2xl">
        <h1 className="text-3xl font-bold text-ink">Showroom immobilier</h1>
        <p className="mt-2 text-ink-soft">
          Terrains, maisons, appartements et boutiques disponibles à la vente
          ou à la location en Guinée.
        </p>
      </div>

      <form
        method="get"
        className="mt-8 grid gap-4 rounded-xl border border-border bg-white p-5 sm:grid-cols-2 lg:grid-cols-5"
      >
        <div className="flex flex-col gap-1">
          <label className="text-xs font-semibold text-ink-soft">Type de bien</label>
          <select
            name="type"
            defaultValue={params.type ?? ""}
            className="rounded-md border border-border px-3 py-2 text-sm"
          >
            <option value="">Tous les types</option>
            {PROPERTY_TYPES.map((t) => (
              <option key={t.value} value={t.value}>{t.label}</option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-xs font-semibold text-ink-soft">Transaction</label>
          <select
            name="transaction"
            defaultValue={params.transaction ?? ""}
            className="rounded-md border border-border px-3 py-2 text-sm"
          >
            <option value="">Vente ou location</option>
            {TRANSACTION_TYPES.map((t) => (
              <option key={t.value} value={t.value}>{t.label}</option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-xs font-semibold text-ink-soft">Ville</label>
          <select
            name="city"
            defaultValue={params.city ?? ""}
            className="rounded-md border border-border px-3 py-2 text-sm"
          >
            <option value="">Toutes les villes</option>
            {GUINEA_CITIES.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-xs font-semibold text-ink-soft">Prix min (GNF)</label>
          <input
            type="number"
            name="min"
            defaultValue={params.min ?? ""}
            placeholder="0"
            className="rounded-md border border-border px-3 py-2 text-sm"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-xs font-semibold text-ink-soft">Prix max (GNF)</label>
          <input
            type="number"
            name="max"
            defaultValue={params.max ?? ""}
            placeholder="Aucun maximum"
            className="rounded-md border border-border px-3 py-2 text-sm"
          />
        </div>

        <div className="flex items-end gap-3 sm:col-span-2 lg:col-span-5">
          <button
            type="submit"
            className="rounded-md bg-primary px-5 py-2 text-sm font-semibold text-white hover:bg-primary-dark"
          >
            Filtrer
          </button>
          <Link href="/showroom" className="text-sm font-semibold text-ink-soft hover:text-primary">
            Réinitialiser
          </Link>
        </div>
      </form>

      <p className="mt-6 text-sm text-ink-soft">
        {properties.length} bien{properties.length > 1 ? "s" : ""} trouvé{properties.length > 1 ? "s" : ""}
      </p>

      {properties.length === 0 ? (
        <div className="mt-8 rounded-xl border border-dashed border-border p-12 text-center text-ink-soft">
          Aucun bien ne correspond à votre recherche pour le moment. Essayez
          d&apos;élargir vos critères.
        </div>
      ) : (
        <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {properties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      )}
    </div>
  );
}
