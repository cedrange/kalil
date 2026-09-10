import Link from "next/link";
import { whatsappLink } from "@/lib/constants";
import MobileMenu from "@/components/MobileMenu";

const links = [
  { href: "/", label: "Accueil" },
  { href: "/showroom", label: "Showroom" },
  { href: "/blog", label: "Blog" },
  { href: "/a-propos", label: "À propos" },
  { href: "/contact", label: "Contact" },
];

export default function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-paper/95 backdrop-blur">
      <div className="container-page relative flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-md bg-primary text-sm font-bold text-white">
            KI
          </span>
          <span className="text-lg font-semibold tracking-tight text-ink">
            Kalil Immo
          </span>
        </Link>

        <nav className="hidden items-center gap-7 md:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-ink-soft transition hover:text-primary"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href={whatsappLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden rounded-md bg-primary px-4 py-2 text-sm font-semibold text-white transition hover:bg-primary-dark sm:inline-flex"
          >
            Nous contacter
          </a>

          <MobileMenu links={links} />
        </div>
      </div>
    </header>
  );
}
