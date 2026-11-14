// Componente de cliente: necesita usePathname() para saber en qué página estamos
// y estado para abrir/cerrar el desplegable de móvil.
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState, type KeyboardEvent } from "react";
import { locales, type Locale } from "@/lib/i18n";

// Selector de idioma:
// - Desde sm (640 px): enlaces en línea "ES · EU · EN".
// - En móvil: botón compacto "ES ▾" que despliega la lista (patrón "disclosure": botón con aria-expanded + lista de enlaces).
export default function LanguageSwitcher({ current, label }: { current: Locale; label: string }) {
  const pathname = usePathname(); // p. ej. "/es/privacidad"
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const listId = useId();

  // Cambia solo el primer segmento (el idioma) y mantiene el resto: "/es/privacidad" → "/eu/privacidad".
  const hrefFor = (lang: Locale) => {
    const segments = pathname.split("/");
    segments[1] = lang;
    return segments.join("/");
  };

  // Con el desplegable abierto: se cierra al pulsar fuera o con Escape (y el foco vuelve al botón).
  useEffect(() => {
    if (!open) return;
    const onPointerDown = (e: PointerEvent) => {
      if (!containerRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKeyDown = (e: globalThis.KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  const focusItem = (index: number) => {
    const links = listRef.current?.querySelectorAll<HTMLAnchorElement>("a");
    if (!links?.length) return;
    links[(index + links.length) % links.length].focus();
  };

  // Flecha abajo en el botón: abre y lleva el foco al primer idioma.
  const onButtonKeyDown = (e: KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setOpen(true);
      requestAnimationFrame(() => focusItem(0));
    }
  };

  // Flechas arriba/abajo, Inicio y Fin para moverse por la lista.
  const onListKeyDown = (e: KeyboardEvent<HTMLUListElement>) => {
    const links = [...(listRef.current?.querySelectorAll("a") ?? [])];
    const i = links.indexOf(document.activeElement as HTMLAnchorElement);
    const moves: Record<string, number> = { ArrowDown: i + 1, ArrowUp: i - 1, Home: 0, End: links.length - 1 };
    if (e.key in moves) {
      e.preventDefault();
      focusItem(moves[e.key]);
    }
  };

  const linkClass = (lang: Locale) =>
    lang === current ? "font-bold text-pimiento" : "text-ink/60 hover:text-ink";

  return (
    <nav aria-label={label} className="font-mono text-sm">
      {/* Escritorio */}
      <div className="hidden items-center gap-1 sm:flex">
        {locales.map((lang, i) => (
          <span key={lang} className="flex items-center gap-1">
            {i > 0 && <span className="text-ink/30">·</span>}
            <Link
              href={hrefFor(lang)}
              hrefLang={lang}
              aria-current={lang === current ? "true" : undefined}
              className={`rounded px-1.5 py-0.5 ${linkClass(lang)}`}
            >
              {lang.toUpperCase()}
            </Link>
          </span>
        ))}
      </div>

      {/* Móvil: desplegable. Se cierra también si el foco sale de él (Tab). */}
      <div
        ref={containerRef}
        className="relative sm:hidden"
        onBlur={(e) => {
          if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setOpen(false);
        }}
      >
        <button
          ref={buttonRef}
          type="button"
          aria-expanded={open}
          aria-controls={listId}
          aria-label={`${label}: ${current.toUpperCase()}`}
          onClick={() => setOpen((o) => !o)}
          onKeyDown={onButtonKeyDown}
          className="flex items-center gap-1 rounded-lg px-2 py-1 font-bold text-pimiento hover:bg-ink/5"
        >
          {current.toUpperCase()}
          <span aria-hidden="true" className={`text-xs transition-transform ${open ? "rotate-180" : ""}`}>
            ▾
          </span>
        </button>
        <ul
          ref={listRef}
          id={listId}
          hidden={!open}
          onKeyDown={onListKeyDown}
          className="absolute top-full right-0 mt-2 min-w-20 rounded-xl border border-ink/10 bg-paper p-1 shadow-lg shadow-ink/15"
        >
          {locales.map((lang) => (
            <li key={lang}>
              <Link
                href={hrefFor(lang)}
                hrefLang={lang}
                aria-current={lang === current ? "true" : undefined}
                onClick={() => setOpen(false)}
                className={`block rounded-lg px-3 py-2 text-center hover:bg-ink/5 ${linkClass(lang)}`}
              >
                {lang.toUpperCase()}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
