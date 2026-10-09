// Eliminar cuenta: /es/eliminar-cuenta, ...
// Google Play exige una URL pública que explique cómo borrar la cuenta y qué pasa con los datos.
import type { Metadata } from "next";
import { getDictionary, isLocale } from "@/lib/i18n";
import { CONTACT_EMAIL } from "@/components/Footer";

export async function generateMetadata({ params }: PageProps<"/[lang]/eliminar-cuenta">): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const { deleteAccount } = getDictionary(lang);
  return { title: deleteAccount.title, description: deleteAccount.description };
}

export default async function DeleteAccountPage({ params }: PageProps<"/[lang]/eliminar-cuenta">) {
  const { lang } = await params;
  if (!isLocale(lang)) return null;
  const { deleteAccount: t } = getDictionary(lang);

  return (
    <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
      <h1 className="font-display text-4xl font-semibold sm:text-5xl">{t.title}</h1>
      <p className="mt-4 text-lg text-ink/75">{t.intro}</p>

      {/* Pasos en la app */}
      <section className="mt-10">
        <h2 className="font-display text-2xl font-semibold">{t.howTitle}</h2>
        <ol className="mt-4 space-y-3">
          {t.steps.map((step, i) => (
            <li key={i} className="flex gap-3">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-pimiento font-mono text-sm text-paper">
                {i + 1}
              </span>
              <span className="pt-0.5">{step}</span>
            </li>
          ))}
        </ol>
      </section>

      {/* Qué se borra / qué se conserva */}
      <div className="mt-10 grid gap-6 sm:grid-cols-2">
        <section className="rounded-2xl border border-ink/10 bg-white/40 p-6">
          <h2 className="font-display text-xl font-semibold">{t.deletedTitle}</h2>
          <ul className="mt-3 list-disc space-y-1 pl-5 marker:text-pimiento">
            {t.deleted.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </section>
        <section className="rounded-2xl bg-sagardo/20 p-6">
          <h2 className="font-display text-xl font-semibold">{t.keptTitle}</h2>
          <p className="mt-3 text-sm text-ink/75">{t.keptIntro}</p>
          <ul className="mt-2 list-disc space-y-1 pl-5 marker:text-sagardo">
            {t.kept.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
          <p className="mt-3 text-sm text-ink/75">{t.rejectedNote}</p>
        </section>
      </div>

      <p className="mt-6 text-ink/75">{t.tip}</p>

      {/* Borrado completo por email */}
      <section className="mt-10 rounded-2xl bg-ink p-6 text-paper">
        <h2 className="font-display text-xl font-semibold">{t.fullTitle}</h2>
        <p className="mt-2 text-paper/80">{t.fullText}</p>
        <a href={`mailto:${CONTACT_EMAIL}`} className="mt-3 inline-block font-mono text-lg text-txakoli hover:underline">
          {CONTACT_EMAIL}
        </a>
      </section>
    </article>
  );
}
