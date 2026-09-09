"use client";

import { useActionState } from "react";
import { submitContactMessage } from "@/app/actions/contacts";

const initialState = { ok: false, error: null };

export default function ContactForm({ propertyId, propertyTitle }) {
  const [state, formAction, pending] = useActionState(
    submitContactMessage,
    initialState
  );

  if (state.ok) {
    return (
      <div className="rounded-lg border border-primary bg-primary-soft p-5 text-sm text-primary-dark">
        <p className="font-semibold">Merci, votre message a bien été envoyé !</p>
        <p className="mt-1">
          Notre équipe vous recontactera très prochainement
          {propertyTitle ? ` au sujet de « ${propertyTitle} »` : ""}.
        </p>
      </div>
    );
  }

  return (
    <form action={formAction} className="flex flex-col gap-4">
      {propertyId && <input type="hidden" name="propertyId" value={propertyId} />}

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="flex flex-col gap-1">
          <label htmlFor="name" className="text-xs font-semibold text-ink-soft">
            Nom complet *
          </label>
          <input
            id="name"
            name="name"
            required
            className="rounded-md border border-border px-3 py-2 text-sm"
            placeholder="Votre nom"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="email" className="text-xs font-semibold text-ink-soft">
            Email *
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            className="rounded-md border border-border px-3 py-2 text-sm"
            placeholder="vous@exemple.com"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="phone" className="text-xs font-semibold text-ink-soft">
            Téléphone (WhatsApp)
          </label>
          <input
            id="phone"
            name="phone"
            className="rounded-md border border-border px-3 py-2 text-sm"
            placeholder="+33 6 12 34 56 78"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="country" className="text-xs font-semibold text-ink-soft">
            Pays de résidence
          </label>
          <input
            id="country"
            name="country"
            className="rounded-md border border-border px-3 py-2 text-sm"
            placeholder="France, Belgique, ..."
          />
        </div>
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="message" className="text-xs font-semibold text-ink-soft">
          Message *
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          className="rounded-md border border-border px-3 py-2 text-sm"
          placeholder={
            propertyTitle
              ? `Bonjour, je suis intéressé(e) par « ${propertyTitle} ». Pouvez-vous me donner plus d'informations ?`
              : "Votre message..."
          }
        />
      </div>

      {state.error && (
        <p className="text-sm font-medium text-danger">{state.error}</p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="w-fit rounded-md bg-primary px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-primary-dark disabled:opacity-60"
      >
        {pending ? "Envoi en cours..." : "Envoyer le message"}
      </button>
    </form>
  );
}
