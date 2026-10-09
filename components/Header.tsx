// Cabecera: logo + nombre (enlaza al inicio del idioma actual) y selector de idioma.
import Image from "next/image";
import Link from "next/link";
import type { Dictionary, Locale } from "@/lib/i18n";
import LanguageSwitcher from "@/components/LanguageSwitcher";

export default function Header({ lang, dict }: { lang: Locale; dict: Dictionary }) {
  return (
    <header className="sticky top-0 z-10 border-b border-ink/10 bg-paper/90 backdrop-blur">
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <Link href={`/${lang}`} aria-label={dict.nav.home} className="flex items-center gap-2">
          <Image src="/logo.png" alt="" width={36} height={36} className="rounded-lg" />
          <span className="font-display text-xl font-semibold tracking-tight">GurePintxo</span>
        </Link>
        <LanguageSwitcher current={lang} label={dict.nav.language} />
      </div>
    </header>
  );
}
