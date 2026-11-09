"use client";

import { useActionState } from "react";
import Link from "next/link";
import { loginAction } from "./actions";

export default function LoginForm({ callbackUrl }: { callbackUrl: string }) {
  const [state, formAction, pending] = useActionState(loginAction, null);

  return (
    <div className="flex flex-1 items-center justify-center px-6 py-16">
      <form
        action={formAction}
        className="flex w-full max-w-sm flex-col gap-4 rounded-xl border-2 border-ink bg-white p-8 shadow-stamp shadow-petal-400 dark:border-zinc-800 dark:bg-zinc-950"
      >
        <h1 className="text-3xl text-zinc-900 dark:text-zinc-50">
          Entrar
        </h1>

        <input type="hidden" name="callbackUrl" value={callbackUrl} />

        <label className="flex flex-col gap-1 text-sm text-zinc-700 dark:text-zinc-300">
          E-mail
          <input
            name="email"
            type="email"
            required
            className="rounded-md border border-zinc-300 px-3 py-2 text-zinc-900 outline-none focus:border-zinc-500 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-50"
          />
        </label>

        <label className="flex flex-col gap-1 text-sm text-zinc-700 dark:text-zinc-300">
          Senha
          <input
            name="password"
            type="password"
            required
            className="rounded-md border border-zinc-300 px-3 py-2 text-zinc-900 outline-none focus:border-zinc-500 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-50"
          />
        </label>

        {state?.error && (
          <p className="text-sm text-red-600 dark:text-red-400">{state.error}</p>
        )}

        <button
          type="submit"
          disabled={pending}
          className="mt-2 rounded-full bg-zinc-900 px-4 py-2 text-sm font-medium text-white disabled:opacity-60 dark:bg-zinc-50 dark:text-zinc-900"
        >
          {pending ? "Entrando..." : "Entrar"}
        </button>

        <p className="text-sm text-zinc-600 dark:text-zinc-400">
          Ainda nao tem conta?{" "}
          <Link href="/register" className="font-medium underline">
            Criar conta
          </Link>
        </p>
      </form>
    </div>
  );
}
