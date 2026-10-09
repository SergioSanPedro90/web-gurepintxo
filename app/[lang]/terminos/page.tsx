// Términos de uso: /es/terminos, /eu/terminos, /en/terminos
// El texto es el mismo que muestra la app (legal.terms.body).
import type { Metadata } from "next";
import { getDictionary, isLocale } from "@/lib/i18n";
import LegalText from "@/components/LegalText";

export async function generateMetadata({ params }: PageProps<"/[lang]/terminos">): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const { terms } = getDictionary(lang).legal;
  return { title: terms.title, description: terms.description };
}

export default async function TermsPage({ params }: PageProps<"/[lang]/terminos">) {
  const { lang } = await params;
  if (!isLocale(lang)) return null;
  const { terms } = getDictionary(lang).legal;
  return <LegalText title={terms.title} body={terms.body} />;
}
