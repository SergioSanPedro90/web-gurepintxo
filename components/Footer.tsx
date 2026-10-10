// Pie de página: enlaces legales + email de contacto.
import Link from "next/link";
import type { Dictionary, Locale } from "@/lib/i18n";

export const CONTACT_EMAIL = "contacto@gurepintxo.com";

export default function Footer({ lang, dict }: { lang: Locale; dict: Dictionary }) {
  const links = [
    { href: `/${lang}/privacidad`, label: dict.footer.privacy },
    { href: `/${lang}/terminos`, label: dict.footer.terms },
    { href: `/${lang}/eliminar-cuenta`, label: dict.footer.deleteAccount },
  ];

  return (
    <footer className="bg-ink text-paper">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-10 sm:flex-row sm:items-end sm:justify-between sm:px-6">
        <div>
          <p className="font-display text-2xl font-semibold">GurePintxo</p>
          <p className="mt-2 text-sm text-paper/70">
            {dict.footer.contact}:{" "}
            <a href={`mailto:${CONTACT_EMAIL}`} className="font-mono text-txakoli hover:underline">
              {CONTACT_EMAIL}
            </a>
          </p>
        </div>
        <nav className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
          {links.map((link) => (
            <Link key={link.href} href={link.href} className="text-paper/80 hover:text-paper hover:underline">
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
      <p className="border-t border-paper/10 py-4 text-center font-mono text-xs text-paper/50">
        © {new Date().getFullYear()} GurePintxo
      </p>
    </footer>
  );
}
