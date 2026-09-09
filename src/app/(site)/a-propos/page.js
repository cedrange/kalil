import Link from "next/link";

export const metadata = {
  title: "À propos",
  description:
    "Kalil Immo accompagne la diaspora guinéenne en Europe dans ses projets immobiliers en Guinée : achat, vente, location et gestion à distance.",
};

const values = [
  {
    title: "Confiance",
    text: "Chaque bien publié est vérifié : titre foncier, photos récentes et informations à jour avant mise en ligne.",
  },
  {
    title: "Proximité",
    text: "Une équipe basée à Conakry, joignable par téléphone, WhatsApp et email, quel que soit votre fuseau horaire.",
  },
  {
    title: "Transparence",
    text: "Des prix clairs, sans frais cachés, et un accompagnement à chaque étape de votre projet immobilier.",
  },
];

export default function AboutPage() {
  return (
    <div className="container-page py-16">
      <div className="max-w-2xl">
        <h1 className="text-3xl font-bold text-ink">
          Le pont immobilier entre la diaspora et la Guinée
        </h1>
        <p className="mt-4 leading-relaxed text-ink-soft">
          Kalil Immo est née d&apos;un constat simple : de nombreux Guinéens
          établis en Europe souhaitent investir, construire ou préparer un
          retour au pays, mais manquent d&apos;un interlocuteur de confiance
          sur place. Notre plateforme rassemble des biens vérifiés — terrains,
          maisons, appartements et boutiques — et vous accompagne à distance,
          de la première visite jusqu&apos;à la signature.
        </p>
      </div>

      <div className="mt-12 grid gap-8 md:grid-cols-3">
        {values.map((v) => (
          <div key={v.title} className="rounded-xl border border-border bg-white p-6">
            <h2 className="font-semibold text-ink">{v.title}</h2>
            <p className="mt-2 text-sm leading-relaxed text-ink-soft">{v.text}</p>
          </div>
        ))}
      </div>

      <div className="mt-16 rounded-xl bg-primary-dark px-8 py-12 text-center text-white">
        <h2 className="text-2xl font-bold">Un projet immobilier en Guinée ?</h2>
        <p className="mt-2 text-white/80">
          Parcourez notre showroom ou contactez-nous directement.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-4">
          <Link
            href="/showroom"
            className="rounded-md bg-accent px-6 py-3 text-sm font-semibold text-ink hover:bg-accent-dark hover:text-white"
          >
            Voir le showroom
          </Link>
          <Link
            href="/contact"
            className="rounded-md border border-white/30 px-6 py-3 text-sm font-semibold text-white hover:bg-white/10"
          >
            Nous contacter
          </Link>
        </div>
      </div>
    </div>
  );
}
