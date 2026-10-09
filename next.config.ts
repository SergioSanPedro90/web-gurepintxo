import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // La raíz "/" no tiene página propia: redirige al idioma por defecto.
  // permanent: false (307) para poder cambiar el idioma por defecto más adelante.
  async redirects() {
    return [{ source: "/", destination: "/es", permanent: false }];
  },

  // Tailwind v4 se procesa con su loader para Turbopack (lo configuró create-next-app).
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },

  // Nota: create-next-app activaba `cacheComponents` y `partialPrefetching`.
  // Los hemos quitado: esta web es 100 % estática y, con cacheComponents,
  // Next 16 no permite `dynamicParams = false` (lo usamos en app/[lang]/layout.tsx).
};

export default nextConfig;
