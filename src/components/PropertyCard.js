import Link from "next/link";
import Image from "next/image";
import {
  formatPrice,
  propertyTypeLabel,
  transactionTypeLabel,
  whatsappLink,
} from "@/lib/constants";
import WhatsAppIcon from "@/components/WhatsAppIcon";

export default function PropertyCard({ property }) {
  const cover = property.images?.[0]?.url ?? null;

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-xl border border-border bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
      <Link
        href={`/showroom/${property.slug}`}
        className="absolute inset-0 z-10"
        aria-label={property.title}
      />

      <div className="relative aspect-[4/3] w-full overflow-hidden bg-primary-soft">
        {cover ? (
          <Image
            src={cover}
            alt={property.title}
            fill
            sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-sm text-ink-soft">
            Photo à venir
          </div>
        )}

        <span className="absolute left-3 top-3 rounded-full bg-primary px-3 py-1 text-xs font-semibold text-white shadow">
          {transactionTypeLabel(property.transactionType)}
        </span>

        {property.status !== "disponible" && (
          <span className="absolute right-3 top-3 rounded-full bg-ink/80 px-3 py-1 text-xs font-semibold text-white">
            {property.status === "vendu" ? "Vendu / Loué" : "Réservé"}
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-2 p-4">
        <span className="text-xs font-semibold uppercase tracking-wide text-accent-dark">
          {propertyTypeLabel(property.type)}
        </span>
        <h3 className="line-clamp-2 text-base font-semibold text-ink">
          {property.title}
        </h3>
        <p className="text-sm text-ink-soft">
          {property.neighborhood ? `${property.neighborhood}, ` : ""}
          {property.city}
        </p>

        <div className="mt-auto flex items-center justify-between pt-3">
          <span className="text-lg font-bold text-primary-dark">
            {formatPrice(property.price, property.currency)}
            {property.transactionType === "location" && (
              <span className="text-xs font-normal text-ink-soft"> /mois</span>
            )}
          </span>
          {property.surface && (
            <span className="text-sm text-ink-soft">{property.surface} m²</span>
          )}
        </div>

        <a
          href={whatsappLink(
            `Bonjour, je suis intéressé(e) par « ${property.title} ». Pouvez-vous me donner plus d'informations ?`
          )}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          className="relative z-20 mt-3 inline-flex items-center justify-center gap-2 rounded-md border border-[#25D366] px-3 py-2 text-sm font-semibold text-[#1DA851] transition hover:bg-[#25D366] hover:text-white"
        >
          <WhatsAppIcon className="h-4 w-4" />
          WhatsApp
        </a>
      </div>
    </div>
  );
}
