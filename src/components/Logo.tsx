type FlowerProps = {
  className?: string;
  petals?: number;
};

/** A flor do logo: pétalas arredondadas em volta de um miolo. */
export function Flower({ className, petals = 8 }: FlowerProps) {
  const items = Array.from({ length: petals }, (_, i) => (360 / petals) * i);
  return (
    <svg viewBox="0 0 100 100" aria-hidden="true" className={className} fill="currentColor">
      {items.map((angle) => (
        <ellipse
          key={angle}
          cx="50"
          cy="28"
          rx="19"
          ry="23"
          transform={`rotate(${angle} 50 50)`}
        />
      ))}
      <circle cx="50" cy="50" r="26" />
    </svg>
  );
}

type LogoProps = {
  variant?: "inline" | "stacked";
  className?: string;
};

/**
 * Wordmark do Clube do Hobby recriado em código (Fraunces + flor SVG),
 * para funcionar em qualquer fundo e nos temas claro e escuro.
 */
export default function Logo({ variant = "inline", className = "" }: LogoProps) {
  const display = "font-display [font-variation-settings:'SOFT'_100,'WONK'_1]";

  const doMark = (size: string, text: string) => (
    <span className={`relative inline-flex items-center justify-center ${size}`}>
      <Flower className="absolute inset-0 h-full w-full text-petal-400" />
      <span className={`relative font-bold leading-none text-paper ${text}`}>do</span>
    </span>
  );

  if (variant === "stacked") {
    return (
      <span
        className={`inline-flex flex-col items-start leading-[0.85] text-foreground ${display} font-black ${className}`}
      >
        <span className="flex items-center gap-1">
          Clube
          {doMark("h-[0.9em] w-[0.9em] -ml-[0.05em]", "text-[0.32em]")}
        </span>
        <span className="pl-[0.6em]">Hobby</span>
      </span>
    );
  }

  return (
    <span
      className={`inline-flex items-center gap-1 leading-none text-foreground ${display} font-black ${className}`}
    >
      Clube
      {doMark("h-[1.45em] w-[1.45em]", "text-[0.55em]")}
      Hobby
    </span>
  );
}
