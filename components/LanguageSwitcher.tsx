// Componente de cliente: necesita usePathname() para saber en qué página estamos.
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { locales, type Locale } from "@/lib/i18n";

export default function LanguageSwitcher({ current, label }: { current: Locale; label: string }) {
  const pathname = usePathname(); // p. ej. "/es/privacidad"

  // Cambia solo el primer segmento (el idioma) y mantiene el resto: "/es/privacidad" → "/eu/privacidad".
  const hrefFor = (lang: Locale) => {
    const segments = pathname.split("/");
    segments[1] = lang;
    return segments.join("/");
  };

  return (
    <nav aria-label={label} className="flex items-center gap-1 font-mono text-sm">
      {locales.map((lang, i) => (
        <span key={lang} className="flex items-center gap-1">
          {i > 0 && <span className="text-ink/30">·</span>}
          <Link
            href={hrefFor(lang)}
            hrefLang={lang}
            aria-current={lang === current ? "true" : undefined}
            className={
              lang === current
                ? "rounded px-1.5 py-0.5 font-bold text-pimiento"
                : "rounded px-1.5 py-0.5 text-ink/60 hover:text-ink"
            }
          >
            {lang.toUpperCase()}
          </Link>
        </span>
      ))}
    </nav>
  );
}
