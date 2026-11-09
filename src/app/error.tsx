"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-3 px-6 py-24 text-center">
      <p className="text-sm font-medium text-red-600 dark:text-red-400">Ops</p>
      <h1 className="text-3xl text-zinc-900 dark:text-zinc-50">
        Algo deu errado
      </h1>
      <p className="max-w-md text-sm text-zinc-600 dark:text-zinc-400">
        Não foi possível carregar essa página agora. Tente novamente em instantes.
      </p>
      <button
        type="button"
        onClick={() => reset()}
        className="mt-2 rounded-full bg-zinc-900 px-4 py-2 text-sm font-medium text-white dark:bg-zinc-50 dark:text-zinc-900"
      >
        Tentar de novo
      </button>
    </div>
  );
}
