// Layout raíz: envuelve TODAS las páginas. Está dentro de [lang] para poder poner <html lang={lang}>.
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Fraunces, JetBrains_Mono, Public_Sans } from "next/font/google";
import { locales, isLocale, getDictionary } from "@/lib/i18n";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "../globals.css";

// Mismas fuentes que la app. Cada una expone una variable CSS que usa globals.css.
const fraunces = Fraunces({ subsets: ["latin"], variable: "--font-fraunces" });
const publicSans = Public_Sans({ subsets: ["latin"], variable: "--font-public-sans" });
const jetbrainsMono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jetbrains-mono" });

// Genera en el build una versión estática por idioma: /es, /eu, /en.
export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

// Cualquier idioma que no esté en generateStaticParams (p. ej. /fr) → 404.
export const dynamicParams = false;

// Metadata común: dominio base y plantilla de título ("Privacidad · GurePintxo").
export const metadata: Metadata = {
  metadataBase: new URL("https://gurepintxo.com"),
  title: { default: "GurePintxo", template: "%s · GurePintxo" },
};

// En Next 16 params es una Promise: hay que hacer await.
export default async function RootLayout({ children, params }: LayoutProps<"/[lang]">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const dict = getDictionary(lang);

  return (
    <html
      lang={lang}
      className={`${fraunces.variable} ${publicSans.variable} ${jetbrainsMono.variable}`}
    >
      <body className="flex min-h-screen flex-col font-body antialiased">
        <Header lang={lang} dict={dict} />
        <main className="flex-1">{children}</main>
        <Footer lang={lang} dict={dict} />
      </body>
    </html>
  );
}
