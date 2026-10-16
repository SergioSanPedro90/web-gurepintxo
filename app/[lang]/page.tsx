// Página de inicio: /es, /eu, /en
import type { Metadata } from "next";
import Image from "next/image";
import { getDictionary, isLocale } from "@/lib/i18n";

// Las 4 funciones de la app. "image" es el archivo en public/screenshots/.
const FEATURES = [
  { key: "nearby", image: "/screenshots/cerca.jpg" },
  { key: "discover", image: "/screenshots/descubrir.png" },
  { key: "bar", image: "/screenshots/ficha-bar.jpg" },
  { key: "routes", image: "/screenshots/rutas.jpg" },
] as const;

// Página de donaciones. Enlace normal, sin el widget/script de Ko-fi.
const KOFI_URL = "https://ko-fi.com/gurepintxo";

// Título y descripción de la pestaña/buscadores, traducidos.
export async function generateMetadata({ params }: PageProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const dict = getDictionary(lang);
  return {
    title: { absolute: dict.meta.homeTitle }, // "absolute" evita la plantilla "%s · GurePintxo"
    description: dict.meta.homeDescription,
  };
}

export default async function HomePage({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!isLocale(lang)) return null; // nunca pasa: el layout ya devuelve 404
  const { home } = getDictionary(lang);

  return (
    <>
      {/* HERO */}
      {/* Móvil: una columna centrada (texto arriba, captura debajo). Desde md: dos columnas centradas en vertical. */}
      <section className="mx-auto grid max-w-7xl items-center gap-6 px-4 py-14 sm:px-6 sm:py-20 md:gap-10 md:grid-cols-[1.2fr_1fr]">
        <div className="min-w-0 text-center md:text-left">
          <p className="font-mono text-sm uppercase tracking-widest text-pimiento">{home.eyebrow}</p>
          <h1 className="mt-4 font-display text-4xl font-semibold tracking-tight sm:text-6xl lg:text-7xl">
            GurePintxo
          </h1>
          <p className="mx-auto mt-5 max-w-md text-lg text-ink/75 sm:text-xl md:mx-0">{home.tagline}</p>

          {/* Botón de Google Play desactivado hasta que la app esté publicada. En móvil, centrado y con el ancho del logo. */}
          <div className="mx-auto mt-8 flex w-full max-w-56 cursor-not-allowed items-center justify-center gap-3 rounded-2xl bg-ink px-5 py-3 text-left text-paper opacity-90 sm:max-w-72 md:mx-0 md:inline-flex md:w-auto md:max-w-none md:justify-start" aria-disabled="true">
            <PlayIcon />
            <span className="flex flex-col leading-tight">
              <span className="font-mono text-[11px] uppercase tracking-wider text-txakoli">{home.comingSoon}</span>
              <span className="text-lg font-semibold">{home.playButton}</span>
            </span>
          </div>
        </div>

        <div className="flex justify-center md:justify-end">
          <Image
            src="/logo.png"
            alt="GurePintxo"
            width={512}
            height={512}
            preload
            sizes="(min-width: 640px) 288px, 224px"
            className="w-56 rounded-4xl shadow-xl shadow-ink/20 sm:w-72"
          />
        </div>
      </section>

      {/* CAPTURAS */}
      <section className="bg-ink py-14 text-paper sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <h2 className="font-display text-3xl font-semibold sm:text-4xl">{home.screenshotsTitle}</h2>
          {/* En móvil: carrusel horizontal con scroll. En escritorio: 4 columnas. */}
          <ul className="mt-10 flex snap-x snap-mandatory gap-5 overflow-x-auto pb-4 md:grid md:grid-cols-4 md:overflow-visible">
            {FEATURES.map(({ key, image }) => (
              <li key={key} className="w-56 shrink-0 snap-center md:w-auto">
                <Image
                  src={image}
                  alt={home.features[key].name}
                  width={1080}
                  height={2340}
                  className="w-full rounded-3xl border-4 border-paper/10"
                />
                <p className="mt-3 text-center font-mono text-sm text-txakoli">{home.features[key].name}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* CÓMO FUNCIONA */}
      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20">
        <h2 className="font-display text-3xl font-semibold sm:text-4xl">{home.howTitle}</h2>
        <ol className="mt-10 grid gap-6 sm:grid-cols-2">
          {FEATURES.map(({ key }, i) => (
            <li key={key} className="rounded-2xl border border-ink/10 bg-white/40 p-6">
              <span className="font-mono text-sm text-pimiento">0{i + 1}</span>
              <h3 className="mt-2 font-display text-2xl font-semibold">{home.features[key].name}</h3>
              <p className="mt-2 text-ink/75">{home.features[key].text}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* ORIGEN DE LOS BARES */}
      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 sm:pb-24">
        <h2 className="font-display text-3xl font-semibold sm:text-4xl">{home.sources.title}</h2>
        <div className="mt-8 grid gap-6 sm:grid-cols-2">
          <div className="rounded-2xl bg-sagardo/20 p-6">
            <h3 className="font-display text-xl font-semibold">{home.sources.officialTitle}</h3>
            <p className="mt-2 text-ink/80">{home.sources.official}</p>
          </div>
          <div className="rounded-2xl bg-txakoli/25 p-6">
            <h3 className="font-display text-xl font-semibold">{home.sources.communityTitle}</h3>
            <p className="mt-2 text-ink/80">{home.sources.community}</p>
          </div>
        </div>
      </section>

      {/* APOYA EL PROYECTO (ancla #apoyar, enlazada desde el footer). scroll-mt deja hueco para la cabecera fija. */}
      <section id="apoyar" className="mx-auto max-w-7xl scroll-mt-20 px-4 pb-16 sm:px-6 sm:pb-24">
        <div className="rounded-2xl bg-pimiento/10 p-6 text-center sm:p-10">
          <h2 className="font-display text-3xl font-semibold sm:text-4xl">{home.support.title}</h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-ink/80">{home.support.text}</p>
          <a
            href={KOFI_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex items-center justify-center rounded-2xl bg-pimiento px-6 py-3 text-lg font-semibold text-paper transition-colors hover:bg-ink"
          >
            {home.support.button}
          </a>
        </div>
      </section>
    </>
  );
}

// Icono "play" sencillo (triángulo), sin usar el logo oficial de Google Play.
function PlayIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-7 w-7 fill-txakoli" aria-hidden="true">
      <path d="M5 3.5v17a1 1 0 0 0 1.5.86l14-8.5a1 1 0 0 0 0-1.72l-14-8.5A1 1 0 0 0 5 3.5Z" />
    </svg>
  );
}
