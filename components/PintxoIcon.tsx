// Icono de pintxo: rebanada de pan, ingrediente encima y palillo clavado en diagonal.
// Mismo estilo de línea que los iconos Lucide de la app (24×24, trazo 2, extremos redondeados, sin relleno).
// El color sale de currentColor, así que hereda el color del texto.
export default function PintxoIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {/* Palillo */}
      <path d="m15 2-2 7" />
      {/* Ingrediente (cúpula + base) */}
      <path d="M5 13.5C5 11 8 9 12 9s7 2 7 4.5" />
      <path d="M4 13.5h16" />
      {/* Pan */}
      <rect x="3" y="16.5" width="18" height="4.5" rx="1.5" />
    </svg>
  );
}
