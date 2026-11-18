"use client";

import { useEffect, useRef, useState } from "react";

type CarouselProps = {
  children: React.ReactNode[];
  /** Largura mínima de cada item antes da fileira virar carrossel (o item cresce para preencher o espaço quando sobra). */
  itemClassName?: string;
  gapClassName?: string;
};

/**
 * Fileira de cards que vira carrossel com botões sempre que o conteúdo não cabe
 * numa linha só (os itens crescem para preencher o espaço quando sobra, então
 * em telas largas isso já funciona como uma grade comum, sem botões).
 */
export default function Carousel({
  children,
  itemClassName = "min-w-[260px]",
  gapClassName = "gap-5",
}: CarouselProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;

    const update = () => {
      setCanPrev(el.scrollLeft > 4);
      setCanNext(el.scrollLeft < el.scrollWidth - el.clientWidth - 4);
    };

    update();
    el.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    const observer = new ResizeObserver(update);
    observer.observe(el);

    return () => {
      el.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
      observer.disconnect();
    };
  }, [children.length]);

  function scroll(direction: 1 | -1) {
    const el = trackRef.current;
    if (!el) return;
    el.scrollBy({ left: direction * el.clientWidth * 0.8, behavior: "smooth" });
  }

  return (
    <div className="relative">
      <div
        ref={trackRef}
        className={`flex snap-x snap-mandatory ${gapClassName} overflow-x-auto scroll-smooth pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden`}
      >
        {children.map((child, index) => (
          <div key={index} className={`flex-1 shrink-0 snap-start ${itemClassName}`}>
            {child}
          </div>
        ))}
      </div>

      {canPrev && (
        <button
          type="button"
          onClick={() => scroll(-1)}
          aria-label="Ver itens anteriores"
          className="absolute left-1 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border-2 border-foreground bg-surface text-foreground shadow-stamp"
        >
          <ArrowIcon direction="left" />
        </button>
      )}
      {canNext && (
        <button
          type="button"
          onClick={() => scroll(1)}
          aria-label="Ver mais itens"
          className="absolute right-1 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border-2 border-foreground bg-surface text-foreground shadow-stamp"
        >
          <ArrowIcon direction="right" />
        </button>
      )}
    </div>
  );
}

function ArrowIcon({ direction }: { direction: "left" | "right" }) {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d={direction === "left" ? "M15 5l-7 7 7 7" : "M9 5l7 7-7 7"} />
    </svg>
  );
}
