import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Página não encontrada | Clube do Hobby",
};

export default function NotFound() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-3 px-6 py-24 text-center">
      <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">404</p>
      <h1 className="text-3xl text-zinc-900 dark:text-zinc-50">
        Não encontramos essa página
      </h1>
      <p className="max-w-md text-sm text-zinc-600 dark:text-zinc-400">
        O link pode estar errado ou o conteúdo pode ter sido removido.
      </p>
      <Link
        href="/"
        className="mt-2 rounded-full bg-zinc-900 px-4 py-2 text-sm font-medium text-white dark:bg-zinc-50 dark:text-zinc-900"
      >
        Voltar para a home
      </Link>
    </div>
  );
}
