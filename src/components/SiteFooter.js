import Link from "next/link";

export default function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-border bg-white">
      <div className="container-page grid gap-10 py-14 md:grid-cols-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="flex h-9 w-9 items-center justify-center rounded-md bg-primary text-sm font-bold text-white">
              KI
            </span>
            <span className="text-lg font-semibold text-ink">Kalil Immo</span>
          </div>
          <p className="mt-4 text-sm leading-relaxed text-ink-soft">
            La plateforme immobilière qui connecte la diaspora guinéenne en
            Europe aux meilleures opportunités en Guinée : terrains, maisons,
            appartements et boutiques.
          </p>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-ink">Navigation</h3>
          <ul className="mt-4 space-y-2 text-sm text-ink-soft">
            <li><Link href="/showroom" className="hover:text-primary">Showroom</Link></li>
            <li><Link href="/blog" className="hover:text-primary">Blog</Link></li>
            <li><Link href="/a-propos" className="hover:text-primary">À propos</Link></li>
            <li><Link href="/contact" className="hover:text-primary">Contact</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-ink">Types de biens</h3>
          <ul className="mt-4 space-y-2 text-sm text-ink-soft">
            <li><Link href="/showroom?type=terrain" className="hover:text-primary">Terrains</Link></li>
            <li><Link href="/showroom?type=maison" className="hover:text-primary">Maisons</Link></li>
            <li><Link href="/showroom?type=appartement" className="hover:text-primary">Appartements</Link></li>
            <li><Link href="/showroom?type=boutique" className="hover:text-primary">Boutiques</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-ink">Contact</h3>
          <ul className="mt-4 space-y-2 text-sm text-ink-soft">
            <li>Conakry, République de Guinée</li>
            <li>
              <a href="tel:+224600000000" className="hover:text-primary">
                +224 600 00 00 00
              </a>
            </li>
            <li>
              <a href="mailto:contact@kalilimmo.com" className="hover:text-primary">
                contact@kalilimmo.com
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-border py-6">
        <p className="container-page text-center text-xs text-ink-soft">
          © {new Date().getFullYear()} Kalil Immo. Tous droits réservés.
        </p>
      </div>
    </footer>
  );
}
