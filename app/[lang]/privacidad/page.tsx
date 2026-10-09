// Política de privacidad: /es/privacidad, /eu/privacidad, /en/privacidad
// El texto es el mismo que muestra la app (legal.privacy.body).
import type { Metadata } from "next";
import { getDictionary, isLocale } from "@/lib/i18n";
import LegalText from "@/components/LegalText";

export async function generateMetadata({ params }: PageProps<"/[lang]/privacidad">): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const { privacy } = getDictionary(lang).legal;
  return { title: privacy.title, description: privacy.description };
}

export default async function PrivacyPage({ params }: PageProps<"/[lang]/privacidad">) {
  const { lang } = await params;
  if (!isLocale(lang)) return null;
  const { privacy } = getDictionary(lang).legal;
  return <LegalText title={privacy.title} body={privacy.body} />;
}
