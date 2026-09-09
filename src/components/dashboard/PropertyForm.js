"use client";

import { useActionState, useState } from "react";
import Image from "next/image";
import { createProperty, updateProperty } from "@/app/actions/properties";
import {
  GUINEA_CITIES,
  PROPERTY_STATUSES,
  PROPERTY_TYPES,
  TRANSACTION_TYPES,
} from "@/lib/constants";

const initialState = { error: null };

export default function PropertyForm({ property }) {
  const action = property ? updateProperty.bind(null, property.id) : createProperty;
  const [state, formAction, pending] = useActionState(action, initialState);
  const [imagesToRemove, setImagesToRemove] = useState([]);

  const toggleRemove = (id) => {
    setImagesToRemove((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  return (
    <form action={formAction} className="flex flex-col gap-6">
      <div className="grid gap-4 rounded-xl border border-border bg-white p-6 sm:grid-cols-2">
        <div className="flex flex-col gap-1 sm:col-span-2">
          <label className="text-xs font-semibold text-ink-soft">Titre de l&apos;annonce *</label>
          <input
            name="title"
            required
            defaultValue={property?.title}
            className="rounded-md border border-border px-3 py-2 text-sm"
            placeholder="Ex : Villa moderne avec piscine à Kipé"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-xs font-semibold text-ink-soft">Type de bien *</label>
          <select
            name="type"
            defaultValue={property?.type ?? "maison"}
            className="rounded-md border border-border px-3 py-2 text-sm"
          >
            {PROPERTY_TYPES.map((t) => (
              <option key={t.value} value={t.value}>{t.label}</option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-xs font-semibold text-ink-soft">Transaction *</label>
          <select
            name="transactionType"
            defaultValue={property?.transactionType ?? "vente"}
            className="rounded-md border border-border px-3 py-2 text-sm"
          >
            {TRANSACTION_TYPES.map((t) => (
              <option key={t.value} value={t.value}>{t.label}</option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-xs font-semibold text-ink-soft">Statut</label>
          <select
            name="status"
            defaultValue={property?.status ?? "disponible"}
            className="rounded-md border border-border px-3 py-2 text-sm"
          >
            {PROPERTY_STATUSES.map((s) => (
              <option key={s.value} value={s.value}>{s.label}</option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-xs font-semibold text-ink-soft">Mis en avant</label>
          <label className="mt-2 flex items-center gap-2 text-sm text-ink-soft">
            <input
              type="checkbox"
              name="featured"
              defaultChecked={property?.featured}
              className="h-4 w-4 rounded border-border"
            />
            Afficher dans les biens à la une
          </label>
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-xs font-semibold text-ink-soft">Prix *</label>
          <input
            type="number"
            name="price"
            required
            min={0}
            defaultValue={property?.price}
            className="rounded-md border border-border px-3 py-2 text-sm"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-xs font-semibold text-ink-soft">Devise</label>
          <select
            name="currency"
            defaultValue={property?.currency ?? "GNF"}
            className="rounded-md border border-border px-3 py-2 text-sm"
          >
            <option value="GNF">GNF (Franc guinéen)</option>
            <option value="EUR">EUR</option>
            <option value="USD">USD</option>
          </select>
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-xs font-semibold text-ink-soft">Ville *</label>
          <input
            name="city"
            list="cities"
            required
            defaultValue={property?.city}
            className="rounded-md border border-border px-3 py-2 text-sm"
          />
          <datalist id="cities">
            {GUINEA_CITIES.map((c) => (
              <option key={c} value={c} />
            ))}
          </datalist>
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-xs font-semibold text-ink-soft">Quartier</label>
          <input
            name="neighborhood"
            defaultValue={property?.neighborhood ?? ""}
            className="rounded-md border border-border px-3 py-2 text-sm"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-xs font-semibold text-ink-soft">Surface (m²)</label>
          <input
            type="number"
            name="surface"
            min={0}
            defaultValue={property?.surface ?? ""}
            className="rounded-md border border-border px-3 py-2 text-sm"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-xs font-semibold text-ink-soft">Chambres</label>
          <input
            type="number"
            name="bedrooms"
            min={0}
            defaultValue={property?.bedrooms ?? ""}
            className="rounded-md border border-border px-3 py-2 text-sm"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-xs font-semibold text-ink-soft">Salles de bain</label>
          <input
            type="number"
            name="bathrooms"
            min={0}
            defaultValue={property?.bathrooms ?? ""}
            className="rounded-md border border-border px-3 py-2 text-sm"
          />
        </div>

        <div className="flex flex-col gap-1 sm:col-span-2">
          <label className="text-xs font-semibold text-ink-soft">Description *</label>
          <textarea
            name="description"
            required
            rows={6}
            defaultValue={property?.description}
            className="rounded-md border border-border px-3 py-2 text-sm"
          />
        </div>
      </div>

      <div className="rounded-xl border border-border bg-white p-6">
        <h2 className="text-sm font-semibold text-ink">Photos</h2>

        {property?.images?.length > 0 && (
          <div className="mt-4 grid grid-cols-3 gap-3 sm:grid-cols-4">
            {property.images.map((img) => (
              <div key={img.id} className="relative">
                <div className={`relative aspect-square overflow-hidden rounded-lg border ${imagesToRemove.includes(img.id) ? "opacity-30" : "border-border"}`}>
                  <Image src={img.url} alt="" fill sizes="150px" className="object-cover" />
                </div>
                <label className="mt-1 flex items-center gap-1 text-xs text-danger">
                  <input
                    type="checkbox"
                    name="removeImages"
                    value={img.id}
                    checked={imagesToRemove.includes(img.id)}
                    onChange={() => toggleRemove(img.id)}
                    className="h-3 w-3"
                  />
                  Supprimer
                </label>
              </div>
            ))}
          </div>
        )}

        <div className="mt-4 flex flex-col gap-1">
          <label className="text-xs font-semibold text-ink-soft">
            Ajouter des photos
          </label>
          <input
            type="file"
            name="images"
            accept="image/*"
            multiple
            className="text-sm"
          />
        </div>
      </div>

      {state.error && <p className="text-sm font-medium text-danger">{state.error}</p>}
      {state.success && (
        <p className="text-sm font-medium text-primary">Bien enregistré avec succès.</p>
      )}

      <div>
        <button
          type="submit"
          disabled={pending}
          className="rounded-md bg-primary px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-primary-dark disabled:opacity-60"
        >
          {pending ? "Enregistrement..." : "Enregistrer le bien"}
        </button>
      </div>
    </form>
  );
}
