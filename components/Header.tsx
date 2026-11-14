// Cabecera: logo + nombre (enlaza al inicio del idioma actual), botón de apoyo (Ko-fi) y selector de idioma.
import Image from "next/image";
import Link from "next/link";
import type { Dictionary, Locale } from "@/lib/i18n";
import { KOFI_URL } from "@/lib/links";
import LanguageSwitcher from "@/components/LanguageSwitcher";

export default function Header({ lang, dict }: { lang: Locale; dict: Dictionary }) {
  return (
    <header className="sticky top-0 z-10 border-b border-ink/10 bg-paper/90 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-2 px-4 py-3 sm:gap-4 sm:px-6">
        <Link href={`/${lang}`} aria-label={dict.nav.home} className="flex shrink-0 items-center gap-2">
          <Image src="/logo.png" alt="" width={36} height={36} className="rounded-lg" />
          <span className="font-display text-xl font-semibold tracking-tight">GurePintxo</span>
        </Link>

        <div className="flex items-center gap-2 sm:gap-4">
          {/* Botón de apoyo: texto corto en móvil (el selector de idioma pasa a desplegable para dejarle sitio), frase completa desde sm. */}
          <a
            href={KOFI_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={dict.nav.support.ariaLabel}
            className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-pimiento px-3 py-1 text-sm font-semibold whitespace-nowrap text-white transition-colors hover:bg-ink"
          >
            <span aria-hidden="true">🍢</span>
            <span className="sm:hidden">{dict.nav.support.short}</span>
            <span className="hidden sm:inline">{dict.nav.support.full}</span>
          </a>
          <LanguageSwitcher current={lang} label={dict.nav.language} />
        </div>
      </div>
    </header>
  );
}
