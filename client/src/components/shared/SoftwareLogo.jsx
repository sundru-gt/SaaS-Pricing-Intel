import { useState } from "react";
import { Sparkles, Boxes } from "lucide-react";

/**
 * Vibrant modern gradients for fallback/unknown software emblems.
 * Inspired by Linear, Stripe, and modern design systems.
 */
const VIBRANT_PALETTES = [
  { gradient: "from-blue-600 to-indigo-600", text: "text-white", border: "border-blue-400/30" },
  { gradient: "from-violet-600 to-purple-600", text: "text-white", border: "border-purple-400/30" },
  { gradient: "from-rose-500 to-pink-600", text: "text-white", border: "border-rose-400/30" },
  { gradient: "from-emerald-500 to-teal-600", text: "text-white", border: "border-emerald-400/30" },
  { gradient: "from-amber-500 to-orange-600", text: "text-white", border: "border-amber-400/30" },
  { gradient: "from-sky-500 to-blue-600", text: "text-white", border: "border-sky-400/30" },
  { gradient: "from-fuchsia-600 to-pink-600", text: "text-white", border: "border-fuchsia-400/30" },
  { gradient: "from-teal-500 to-cyan-600", text: "text-white", border: "border-teal-400/30" },
];

function getPaletteForName(name = "") {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  const index = Math.abs(hash) % VIBRANT_PALETTES.length;
  return VIBRANT_PALETTES[index];
}

/**
 * High-fidelity software logo component.
 * Automatically loads official high-res brand icons using domain discovery,
 * with a vibrant, colorful monogram fallback for unknown/missing logos.
 */
export default function SoftwareLogo({
  name = "",
  url = "",
  logoText = "",
  size = "md", // "xs" | "sm" | "md" | "lg"
  className = "",
}) {
  const [hasError, setHasError] = useState(false);

  // Extract root domain from URL if available
  let domain = "";
  if (url) {
    try {
      domain = new URL(url).hostname.replace(/^www\./, "");
    } catch {
      // Invalid URL string
    }
  }

  // Dimension presets
  const sizeClasses =
    {
      xs: "w-6 h-6 text-[10px] rounded-md",
      sm: "w-7 h-7 text-[11px] rounded-lg",
      md: "w-9 h-9 text-xs rounded-xl",
      lg: "w-11 h-11 text-sm rounded-xl",
    }[size] || "w-9 h-9 text-xs rounded-xl";

  const fallbackText =
    logoText ||
    (name
      ? name
          .split(" ")
          .filter(Boolean)
          .slice(0, 2)
          .map((w) => w[0])
          .join("")
          .toUpperCase()
      : "");

  const isGeneric = !fallbackText || fallbackText === "SW";
  const palette = getPaletteForName(name || logoText || "Software");

  // High-resolution Google global favicon service (sz=128 for crisp retina rendering)
  const logoUrl = domain && !hasError
    ? `https://www.google.com/s2/favicons?domain=${domain}&sz=128`
    : null;

  return (
    <div
      className={`relative flex items-center justify-center flex-shrink-0 overflow-hidden shadow-2xs group-hover:scale-105 transition-transform select-none ${sizeClasses} ${
        logoUrl
          ? "border border-border/80 bg-white dark:bg-zinc-900"
          : `bg-gradient-to-br ${palette.gradient} border ${palette.border} shadow-sm`
      } ${className}`}
    >
      {logoUrl ? (
        <img
          src={logoUrl}
          alt={`${name} official logo`}
          loading="lazy"
          onError={() => setHasError(true)}
          className="w-full h-full object-contain p-1.5"
        />
      ) : isGeneric ? (
        <Sparkles className="w-4 h-4 text-white drop-shadow-xs" />
      ) : (
        <span className="font-mono font-black text-white tracking-tight drop-shadow-xs">
          {fallbackText}
        </span>
      )}
    </div>
  );
}
