import PropertyForm from "@/components/dashboard/PropertyForm";

export default function NewPropertyPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-ink">Nouveau bien</h1>
      <p className="mt-1 text-ink-soft">Ajoutez un nouveau bien au showroom.</p>

      <div className="mt-6 max-w-3xl">
        <PropertyForm />
      </div>
    </div>
  );
}
