"use client";

import { useActionState } from "react";
import Link from "next/link";
import { loginAction } from "./actions";

const fieldInput =
  "h-[52px] rounded-2xl border-2 border-line bg-surface px-4 font-sans text-base text-foreground outline-none placeholder:text-zinc-500 focus:border-zinc-400";

export default function LoginForm({ callbackUrl }: { callbackUrl: string }) {
  const [state, formAction, pending] = useActionState(loginAction, null);

  return (
    <div className="flex flex-1 flex-wrap">
      <aside className="relative flex min-h-[22rem] flex-1 basis-[26rem] flex-col justify-between overflow-hidden bg-oliveira p-8 text-paper sm:p-12">
        <Link
          href="/"
          className="relative z-10 inline-flex min-h-11 w-fit items-center gap-2 text-sm font-semibold uppercase tracking-[0.08em]"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden="true">
            <path d="M15 5l-7 7 7 7" />
          </svg>
          Voltar ao site
        </Link>

        <svg
          viewBox="0 0 600 600"
          className="pointer-events-none absolute -right-28 top-1/2 h-[560px] w-[560px] -translate-y-1/2"
          aria-hidden="true"
        >
          <path
            d="M300 90c110-12 200 60 206 168s-48 228-180 246-240-48-246-168S192 102 300 90z"
            className="fill-[#757044]"
          />
          <g transform="translate(300 300)" className="fill-roma-400">
            {Array.from({ length: 8 }, (_, i) => (
              <ellipse key={i} cx="0" cy="-70" rx="34" ry="62" transform={`rotate(${i * 45})`} />
            ))}
            <circle r="46" />
          </g>
          <path
            d="M110 470c-20-36-44-64-40-92 3-22 30-28 44-6 13-24 40-18 42 6 2 32-22 62-46 92z"
            className="fill-bombom"
          />
          <g transform="translate(480 80)" className="fill-abacate">
            <rect x="-3" y="0" width="6" height="130" rx="3" />
            <ellipse cx="-20" cy="34" rx="20" ry="9" transform="rotate(-30 -20 34)" />
            <ellipse cx="20" cy="60" rx="20" ry="9" transform="rotate(30 20 60)" />
            <ellipse cx="-20" cy="86" rx="20" ry="9" transform="rotate(-30 -20 86)" />
            <ellipse cx="0" cy="6" rx="9" ry="16" />
          </g>
        </svg>

        <div className="relative flex max-w-[420px] flex-col gap-4">
          <h1 className="font-display text-[clamp(2.25rem,4vw,3.5rem)] font-black leading-[1.04]">
            Que bom te ver por aqui.
          </h1>
          <p className="text-lg text-background">
            Entre para ver as indicações e as vendas da comunidade.
          </p>
        </div>
      </aside>

      <main className="flex flex-1 basis-[28rem] items-center justify-center px-6 py-12 sm:p-12">
        <div className="flex w-full max-w-[420px] flex-col gap-7">
          <div
            role="tablist"
            aria-label="Acesso"
            className="grid grid-cols-2 rounded-full bg-background p-1"
          >
            <span
              role="tab"
              aria-selected="true"
              className="flex min-h-11 items-center justify-center rounded-full bg-foreground text-sm font-bold text-background"
            >
              Entrar
            </span>
            <Link
              href="/register"
              role="tab"
              aria-selected="false"
              className="flex min-h-11 items-center justify-center rounded-full text-sm font-bold text-zinc-600 dark:text-zinc-300"
            >
              Criar conta
            </Link>
          </div>

          <form action={formAction} className="flex flex-col gap-4.5">
            <input type="hidden" name="callbackUrl" value={callbackUrl} />

            <label className="flex flex-col gap-1.5">
              <span className="text-sm font-bold text-foreground">E-mail</span>
              <input
                name="email"
                type="email"
                autoComplete="email"
                required
                placeholder="voce@email.com"
                className={fieldInput}
              />
            </label>

            <label className="flex flex-col gap-1.5">
              <span className="text-sm font-bold text-foreground">Senha</span>
              <input
                name="password"
                type="password"
                autoComplete="current-password"
                required
                placeholder="Sua senha"
                className={fieldInput}
              />
            </label>

            {state?.error && <p className="text-sm text-red-600 dark:text-red-400">{state.error}</p>}

            <button
              type="submit"
              disabled={pending}
              className="mt-1.5 inline-flex min-h-14 items-center justify-center rounded-full bg-roma-400 text-lg font-bold text-ink transition-transform hover:-translate-y-0.5 disabled:opacity-60"
            >
              {pending ? "Entrando..." : "Entrar"}
            </button>
          </form>

          <p className="text-center text-sm text-zinc-600 dark:text-zinc-400">
            Ainda não é membro?{" "}
            <Link href="/register" className="font-bold text-foreground underline">
              Criar conta
            </Link>
          </p>
        </div>
      </main>
    </div>
  );
}
