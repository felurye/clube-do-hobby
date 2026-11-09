"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import NavLink, { type NavItem } from "@/components/NavLink";

const itemClass =
  "flex min-h-12 items-center rounded-xl px-4 text-base font-medium text-zinc-800 transition-colors hover:bg-zinc-900/5 dark:text-zinc-200 dark:hover:bg-white/10";
const activeClass = "bg-petal-100 text-ink dark:bg-petal-900 dark:text-paper";

type MobileMenuProps = {
  links: NavItem[];
  /** Bloco de usuário (nome, papel, botão Sair) ou de visitante (Entrar, Criar conta). */
  footer: React.ReactNode;
};

/**
 * Menu do header para telas menores que `lg`: botão hambúrguer que abre um
 * painel logo abaixo do header, com links grandes para toque.
 */
export default function MobileMenu({ links, footer }: MobileMenuProps) {
  const pathname = usePathname();
  // Guarda a rota em que o menu foi aberto: ao navegar, a rota muda e o menu fecha sozinho.
  const [openOn, setOpenOn] = useState<string | null>(null);
  const open = openOn === pathname;
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpenOn(null);
        buttonRef.current?.focus();
      }
    }
    // Ao passar para desktop com o menu aberto, fecha para não travar a rolagem.
    const desktop = matchMedia("(min-width: 64rem)");
    function onResize() {
      if (desktop.matches) setOpenOn(null);
    }

    document.addEventListener("keydown", onKeyDown);
    desktop.addEventListener("change", onResize);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
      desktop.removeEventListener("change", onResize);
    };
  }, [open]);

  return (
    <>
      <button
        ref={buttonRef}
        type="button"
        onClick={() => setOpenOn(open ? null : pathname)}
        aria-expanded={open}
        aria-controls="mobile-menu"
        aria-label={open ? "Fechar menu" : "Abrir menu"}
        className="inline-flex h-11 w-11 items-center justify-center rounded-full text-ink transition-colors hover:bg-zinc-900/5 dark:text-paper dark:hover:bg-white/10"
      >
        <svg
          viewBox="0 0 24 24"
          className="h-6 w-6"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          aria-hidden="true"
        >
          {open ? (
            <path d="M6 6l12 12M18 6L6 18" />
          ) : (
            <path d="M4 7h16M4 12h16M4 17h16" />
          )}
        </svg>
      </button>

      {open && (
        <div className="absolute inset-x-0 top-full flex h-dvh flex-col">
          <nav
            id="mobile-menu"
            aria-label="Menu principal"
            className="max-h-[75dvh] shrink-0 overflow-y-auto border-b-2 border-ink bg-background px-4 pb-6 pt-3 dark:border-zinc-700"
          >
            {links.length > 0 && (
              <ul className="flex flex-col gap-1">
                {links.map((link) => (
                  <li key={link.href}>
                    <NavLink {...link} className={itemClass} activeClassName={activeClass} />
                  </li>
                ))}
              </ul>
            )}
            <div className={links.length > 0 ? "mt-4 border-t border-line pt-4" : ""}>{footer}</div>
          </nav>
          <button
            type="button"
            tabIndex={-1}
            aria-hidden="true"
            onClick={() => setOpenOn(null)}
            className="flex-1 cursor-default bg-ink/40 backdrop-blur-[2px]"
          />
        </div>
      )}
    </>
  );
}
