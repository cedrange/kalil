import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { prisma } from "@/lib/prisma";
import PropertyCard from "@/components/PropertyCard";
import ContactForm from "@/components/ContactForm";
import WhatsAppIcon from "@/components/WhatsAppIcon";
import {
  formatPrice,
  propertyTypeLabel,
  transactionTypeLabel,
  whatsappLink,
} from "@/lib/constants";

async function getProperty(slug) {
  return prisma.property.findUnique({
    where: { slug },
    include: { images: { orderBy: { position: "asc" } } },
  });
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const property = await getProperty(slug);
  if (!property) return {};
  return {
    title: property.title,
    description: property.description.slice(0, 155),
  };
}

export default async function PropertyPage({ params }) {
  const { slug } = await params;
  const property = await getProperty(slug);
  if (!property) notFound();

  const similar = await prisma.property.findMany({
    where: {
      type: property.type,
      NOT: { id: property.id },
    },
    include: { images: { orderBy: { position: "asc" }, take: 1 } },
    take: 3,
    orderBy: { createdAt: "desc" },
  });

  const facts = [
    property.surface ? { label: "Surface", value: `${property.surface} m²` } : null,
    property.bedrooms ? { label: "Chambres", value: property.bedrooms } : null,
    property.bathrooms ? { label: "Salles de bain", value: property.bathrooms } : null,
    { label: "Ville", value: property.city },
    property.neighborhood ? { label: "Quartier", value: property.neighborhood } : null,
  ].filter(Boolean);

  return (
    <div className="container-page py-10">
      <nav className="text-sm text-ink-soft">
        <Link href="/showroom" className="hover:text-primary">Showroom</Link>
        <span className="mx-2">/</span>
        <span>{property.title}</span>
      </nav>

      <div className="mt-6 grid gap-10 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl bg-primary-soft">
            {property.images[0] ? (
              <Image
                src={property.images[0].url}
                alt={property.title}
                fill
                sizes="(min-width: 1024px) 66vw, 100vw"
                priority
                className="object-cover"
              />
            ) : (
              <div className="flex h-full items-center justify-center text-ink-soft">
                Photo à venir
              </div>
            )}
          </div>

          {property.images.length > 1 && (
            <div className="mt-3 grid grid-cols-4 gap-3">
              {property.images.slice(1).map((img) => (
                <div key={img.id} className="relative aspect-square overflow-hidden rounded-lg bg-primary-soft">
                  <Image src={img.url} alt={property.title} fill sizes="20vw" className="object-cover" />
                </div>
              ))}
            </div>
          )}

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <span className="rounded-full bg-primary px-3 py-1 text-xs font-semibold text-white">
              {transactionTypeLabel(property.transactionType)}
            </span>
            <span className="rounded-full bg-accent/20 px-3 py-1 text-xs font-semibold text-accent-dark">
              {propertyTypeLabel(property.type)}
            </span>
            {property.status !== "disponible" && (
              <span className="rounded-full bg-ink/10 px-3 py-1 text-xs font-semibold text-ink">
                {property.status === "vendu" ? "Vendu / Loué" : "Réservé"}
              </span>
            )}
          </div>

          <h1 className="mt-4 text-3xl font-bold text-ink">{property.title}</h1>
          <p className="mt-1 text-ink-soft">
            {property.neighborhood ? `${property.neighborhood}, ` : ""}
            {property.city}, Guinée
          </p>

          <p className="mt-4 text-2xl font-bold text-primary-dark">
            {formatPrice(property.price, property.currency)}
            {property.transactionType === "location" && (
              <span className="text-sm font-normal text-ink-soft"> /mois</span>
            )}
          </p>

          <div className="mt-8 grid grid-cols-2 gap-4 rounded-xl border border-border bg-white p-5 sm:grid-cols-3">
            {facts.map((f) => (
              <div key={f.label}>
                <p className="text-xs uppercase tracking-wide text-ink-soft">{f.label}</p>
                <p className="mt-1 font-semibold text-ink">{f.value}</p>
              </div>
            ))}
          </div>

          <div className="mt-8">
            <h2 className="text-lg font-semibold text-ink">Description</h2>
            <p className="mt-3 whitespace-pre-line leading-relaxed text-ink-soft">
              {property.description}
            </p>
          </div>
        </div>

        <div>
          <div className="sticky top-24 rounded-xl border border-border bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-ink">
              Intéressé par ce bien ?
            </h2>
            <p className="mt-1 text-sm text-ink-soft">
              Laissez vos coordonnées, notre équipe à Conakry vous recontacte
              rapidement.
            </p>
            <div className="mt-5 flex flex-col gap-4">
              <a
                href={whatsappLink(
                  `Bonjour, je suis intéressé(e) par « ${property.title} ». Pouvez-vous me donner plus d'informations ?`
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-md bg-[#25D366] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#1DA851]"
              >
                <WhatsAppIcon className="h-5 w-5" />
                Contacter via WhatsApp
              </a>

              <div className="flex items-center gap-3 text-xs font-medium uppercase text-ink-soft">
                <span className="h-px flex-1 bg-border" />
                ou
                <span className="h-px flex-1 bg-border" />
              </div>

              <ContactForm propertyId={property.id} propertyTitle={property.title} />
            </div>
          </div>
        </div>
      </div>

      {similar.length > 0 && (
        <section className="mt-16">
          <h2 className="text-xl font-bold text-ink">Biens similaires</h2>
          <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {similar.map((p) => (
              <PropertyCard key={p.id} property={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
