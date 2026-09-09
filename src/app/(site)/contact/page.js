import ContactForm from "@/components/ContactForm";

export const metadata = {
  title: "Contact",
  description:
    "Contactez Kalil Immo pour publier une annonce ou obtenir des informations sur nos biens en Guinée.",
};

export default function ContactPage() {
  return (
    <div className="container-page py-16">
      <div className="grid gap-12 lg:grid-cols-2">
        <div>
          <h1 className="text-3xl font-bold text-ink">Contactez-nous</h1>
          <p className="mt-3 max-w-md text-ink-soft">
            Une question, un projet d&apos;achat, ou vous souhaitez publier
            une annonce ? Écrivez-nous, notre équipe basée à Conakry vous
            répond rapidement, même depuis l&apos;Europe.
          </p>

          <div className="mt-8 space-y-4 text-sm">
            <div>
              <p className="font-semibold text-ink">Téléphone / WhatsApp</p>
              <a href="tel:+224600000000" className="text-ink-soft hover:text-primary">
                +224 600 00 00 00
              </a>
            </div>
            <div>
              <p className="font-semibold text-ink">Email</p>
              <a href="mailto:contact@kalilimmo.com" className="text-ink-soft hover:text-primary">
                contact@kalilimmo.com
              </a>
            </div>
            <div>
              <p className="font-semibold text-ink">Bureau</p>
              <p className="text-ink-soft">Conakry, République de Guinée</p>
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-border bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-ink">
            Publier une annonce ou poser une question
          </h2>
          <p className="mt-1 text-sm text-ink-soft">
            Décrivez votre projet (bien à vendre, recherche, question), nous
            revenons vers vous sous 24 à 48h.
          </p>
          <div className="mt-5">
            <ContactForm />
          </div>
        </div>
      </div>
    </div>
  );
}
