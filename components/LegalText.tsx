// Convierte el texto legal plano de la app (con \n) en HTML con títulos, párrafos y listas.
// Reglas: los bloques van separados por una línea en blanco;
// un bloque de una línea tipo "3. Título" es un título; las líneas que empiezan por "- " son una lista.
type Item = { type: "p" | "li"; text: string };

export default function LegalText({ title, body }: { title: string; body: string }) {
  const [updated, ...blocks] = body.split("\n\n");

  return (
    <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
      <h1 className="font-display text-4xl font-semibold sm:text-5xl">{title}</h1>
      <p className="mt-3 font-mono text-sm text-ink/60">{updated}</p>

      <div className="mt-10 space-y-4 leading-relaxed text-ink/85">
        {blocks.map((block, i) => {
          if (/^\d+\.\s/.test(block) && !block.includes("\n")) {
            return (
              <h2 key={i} className="pt-6 font-display text-2xl font-semibold text-ink">
                {block}
              </h2>
            );
          }
          return <Block key={i} lines={block.split("\n")} />;
        })}
      </div>
    </article>
  );
}

// Un bloque puede mezclar párrafos y viñetas: agrupamos las viñetas seguidas en un <ul>.
function Block({ lines }: { lines: string[] }) {
  const items: Item[] = lines.map((line) =>
    line.startsWith("- ") ? { type: "li", text: line.slice(2) } : { type: "p", text: line },
  );

  const groups: Item[][] = [];
  for (const item of items) {
    const last = groups.at(-1);
    if (last && item.type === "li" && last[0].type === "li") last.push(item);
    else groups.push([item]);
  }

  return (
    <div className="space-y-2">
      {groups.map((group, i) =>
        group[0].type === "li" ? (
          <ul key={i} className="list-disc space-y-1 pl-6 marker:text-pimiento">
            {group.map((item, j) => (
              <li key={j}>{item.text}</li>
            ))}
          </ul>
        ) : (
          <p key={i}>{group[0].text}</p>
        ),
      )}
    </div>
  );
}
