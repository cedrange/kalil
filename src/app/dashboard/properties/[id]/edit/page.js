import { notFound } from "next/navigation";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import PropertyForm from "@/components/dashboard/PropertyForm";
import DeleteButton from "@/components/dashboard/DeleteButton";
import { deleteProperty } from "@/app/actions/properties";

export default async function EditPropertyPage({ params }) {
  const { id: idParam } = await params;
  const id = Number(idParam);

  const property = await prisma.property.findUnique({
    where: { id },
    include: { images: { orderBy: { position: "asc" } } },
  });

  if (!property) notFound();

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-ink">Modifier le bien</h1>
          <Link href={`/showroom/${property.slug}`} target="_blank" className="mt-1 inline-block text-sm text-primary hover:underline">
            Voir l&apos;annonce en ligne →
          </Link>
        </div>
        <DeleteButton
          action={deleteProperty.bind(null, id)}
          confirmText={`Supprimer « ${property.title} » ? Cette action est irréversible.`}
        />
      </div>

      <div className="mt-6 max-w-3xl">
        <PropertyForm property={property} />
      </div>
    </div>
  );
}
