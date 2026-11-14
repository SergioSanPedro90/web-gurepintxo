// Cabecera: logo + nombre (enlaza al inicio del idioma actual), botón de apoyo (Ko-fi) y selector de idioma.
import Image from "next/image";
import Link from "next/link";
import type { Dictionary, Locale } from "@/lib/i18n";
import { KOFI_URL } from "@/lib/links";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import PintxoIcon from "@/components/PintxoIcon";

export default function Header({ lang, dict }: { lang: Locale; dict: Dictionary }) {
  return (
    <header className="sticky top-0 z-10 border-b border-ink/10 bg-paper/90 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-2 px-4 py-3 sm:gap-4 sm:px-6">
        <Link href={`/${lang}`} aria-label={dict.nav.home} className="flex shrink-0 items-center gap-2">
          <Image src="/logo.png" alt="" width={36} height={36} className="rounded-lg" />
          <span className="font-display text-xl font-semibold tracking-tight">GurePintxo</span>
        </Link>

        <div className="flex items-center gap-2 sm:gap-4">
          {/*
            Botón de apoyo. Logo (151 px) + selector (120 px) dejan poco sitio en móvil:
            - menos de 440 px (p. ej. 360): solo el icono; el texto corto no cabe (medido: hasta 408 px en eu).
            - de 440 a 639 px: icono + texto corto.
            - desde sm (640 px): icono + frase completa.
          */}
          <a
            href={KOFI_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={dict.nav.support.ariaLabel}
            className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-pimiento/40 px-2 py-1 text-sm font-semibold whitespace-nowrap text-pimiento transition-colors hover:border-pimiento hover:bg-pimiento hover:text-paper min-[440px]:px-2.5"
          >
            <PintxoIcon />
            <span className="hidden min-[440px]:inline sm:hidden">{dict.nav.support.short}</span>
            <span className="hidden sm:inline">{dict.nav.support.full}</span>
          </a>
          <LanguageSwitcher current={lang} label={dict.nav.language} />
        </div>
      </div>
    </header>
  );
}
