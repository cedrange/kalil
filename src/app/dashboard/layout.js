import Link from "next/link";
import { getSession } from "@/lib/auth";
import LogoutButton from "@/components/dashboard/LogoutButton";

const navItems = [
  { href: "/dashboard", label: "Aperçu" },
  { href: "/dashboard/properties", label: "Biens immobiliers" },
  { href: "/dashboard/blog", label: "Articles de blog" },
  { href: "/dashboard/contacts", label: "Messages de contact" },
];

export default async function DashboardLayout({ children }) {
  const session = await getSession();

  if (!session) {
    return <div className="min-h-screen bg-primary-dark">{children}</div>;
  }

  return (
    <div className="flex min-h-screen bg-paper">
      <aside className="hidden w-64 shrink-0 flex-col border-r border-border bg-white md:flex">
        <div className="flex h-16 items-center gap-2 border-b border-border px-6">
          <span className="flex h-8 w-8 items-center justify-center rounded-md bg-primary text-xs font-bold text-white">
            KI
          </span>
          <span className="font-semibold text-ink">Kalil Immo</span>
        </div>

        <nav className="flex flex-1 flex-col gap-1 p-4">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-md px-3 py-2 text-sm font-medium text-ink-soft transition hover:bg-primary-soft hover:text-primary"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="border-t border-border p-4">
          <p className="truncate text-xs text-ink-soft">{session.email}</p>
          <LogoutButton className="mt-2 w-full rounded-md border border-border px-3 py-2 text-sm font-medium text-ink-soft hover:bg-primary-soft" />
        </div>
      </aside>

      <div className="flex flex-1 flex-col">
        <header className="flex h-16 items-center justify-between border-b border-border bg-white px-4 md:hidden">
          <span className="font-semibold text-ink">Kalil Immo — Admin</span>
          <LogoutButton className="text-sm font-medium text-primary" />
        </header>

        <nav className="flex gap-4 overflow-x-auto border-b border-border bg-white px-4 py-2 md:hidden">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="shrink-0 text-sm font-medium text-ink-soft">
              {item.label}
            </Link>
          ))}
        </nav>

        <main className="flex-1 p-4 md:p-8">{children}</main>
      </div>
    </div>
  );
}
