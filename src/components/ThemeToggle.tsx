"use client";

import { THEME_COOKIE } from "@/lib/theme";

export default function ThemeToggle() {
  function toggle() {
    const root = document.documentElement;
    const current =
      root.dataset.theme ??
      (matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
    const next = current === "dark" ? "light" : "dark";
    // Desliga as transições durante a troca, para tudo mudar de uma vez
    root.dataset.themeSwitching = "";
    root.dataset.theme = next;
    requestAnimationFrame(() =>
      requestAnimationFrame(() => delete root.dataset.themeSwitching),
    );
    // Cookie lido pelo layout no servidor: a próxima página já vem no tema certo
    document.cookie = `${THEME_COOKIE}=${next}; path=/; max-age=31536000; samesite=lax`;
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="Alternar entre tema claro e escuro"
      title="Alternar tema"
      className="inline-flex h-11 w-11 items-center lg:h-9 lg:w-9 justify-center rounded-full text-zinc-700 transition-colors hover:bg-zinc-900/5 hover:text-ink dark:text-zinc-300 dark:hover:bg-white/10 dark:hover:text-paper"
    >
      {/* Lua no tema claro (ir para o escuro), sol no tema escuro (ir para o claro) */}
      <svg
        viewBox="0 0 24 24"
        className="h-5 w-5 dark:hidden"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
      </svg>
      <svg
        viewBox="0 0 24 24"
        className="hidden h-5 w-5 dark:block"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
      </svg>
    </button>
  );
}
