import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { addHighlightAction, removeHighlightAction } from "./actions";
import ConfirmSubmitButton from "@/components/ConfirmSubmitButton";

export const metadata: Metadata = {
  title: "Destaques do Instagram | Clube do Hobby",
};

export default async function DestaquesAdminPage() {
  const highlights = await prisma.instagramHighlight.findMany({
    orderBy: [{ kind: "asc" }, { position: "asc" }],
  });

  return (
    <div className="mx-auto w-full max-w-2xl flex-1 px-6 py-10">
      <h1 className="text-3xl text-zinc-900 dark:text-zinc-50">
        Destaques do Instagram na home
      </h1>
      <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
        Cole o link de um post ou evento do Instagram para exibir na home. O site so mostra o que for colado aqui.
      </p>

      <form
        action={addHighlightAction}
        className="mt-6 flex flex-col gap-3 rounded-xl border border-zinc-200 p-4 dark:border-zinc-800"
      >
        <label className="flex flex-col gap-1 text-sm text-zinc-700 dark:text-zinc-300">
          Link do post do Instagram
          <input
            name="url"
            type="url"
            required
            placeholder="https://www.instagram.com/p/..."
            className="rounded-md border border-zinc-300 px-3 py-2 text-zinc-900 outline-none focus:border-zinc-500 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-50"
          />
        </label>

        <label className="flex flex-col gap-1 text-sm text-zinc-700 dark:text-zinc-300">
          Tipo
          <select
            name="kind"
            className="rounded-md border border-zinc-300 px-3 py-2 text-zinc-900 outline-none focus:border-zinc-500 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-50"
          >
            <option value="POST">Post (galeria da home)</option>
            <option value="EVENT">Evento (secao de eventos)</option>
          </select>
        </label>

        <label className="flex flex-col gap-1 text-sm text-zinc-700 dark:text-zinc-300">
          Legenda (opcional)
          <input
            name="caption"
            type="text"
            placeholder="Ex: Encontro de maio"
            className="rounded-md border border-zinc-300 px-3 py-2 text-zinc-900 outline-none focus:border-zinc-500 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-50"
          />
        </label>

        <button
          type="submit"
          className="mt-1 self-start rounded-full bg-zinc-900 px-4 py-2 text-sm font-medium text-white dark:bg-zinc-50 dark:text-zinc-900"
        >
          Adicionar
        </button>
      </form>

      <ul className="mt-8 flex flex-col gap-3">
        {highlights.map((highlight) => (
          <li
            key={highlight.id}
            className="flex items-center justify-between gap-3 rounded-lg border border-zinc-200 px-4 py-3 text-sm dark:border-zinc-800"
          >
            <div className="flex min-w-0 flex-col">
              <span className="font-medium text-zinc-900 dark:text-zinc-50">
                {highlight.kind === "EVENT" ? "Evento" : "Post"}
                {highlight.caption ? ` - ${highlight.caption}` : ""}
              </span>
              <a
                href={highlight.url}
                target="_blank"
                rel="noopener noreferrer"
                className="truncate text-zinc-500 underline dark:text-zinc-400"
              >
                {highlight.url}
              </a>
            </div>
            <form action={removeHighlightAction}>
              <input type="hidden" name="id" value={highlight.id} />
              <ConfirmSubmitButton
                confirmMessage="Remover este destaque da home?"
                className="text-red-600 underline dark:text-red-400"
              >
                Remover
              </ConfirmSubmitButton>
            </form>
          </li>
        ))}
        {highlights.length === 0 && (
          <li className="text-sm text-zinc-500 dark:text-zinc-400">Nenhum destaque cadastrado ainda.</li>
        )}
      </ul>
    </div>
  );
}
