import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import CategoryForm from "./category-form";

export const metadata: Metadata = {
  title: "Categorias | Clube do Hobby",
};

export default async function CategoriasPage() {
  const categories = await prisma.category.findMany({ orderBy: { name: "asc" } });

  return (
    <div className="mx-auto w-full max-w-2xl flex-1 px-6 py-10">
      <h1 className="text-3xl text-zinc-900 dark:text-zinc-50">
        Categorias de indicacoes
      </h1>
      <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
        Categorias existentes nao podem ser removidas (para nao quebrar indicacoes ja cadastradas), mas voce pode adicionar novas.
      </p>

      <CategoryForm />

      <ul className="mt-8 flex flex-wrap gap-2">
        {categories.map((category) => (
          <li
            key={category.id}
            className="rounded-full border border-zinc-300 px-3 py-1 text-sm text-zinc-700 dark:border-zinc-700 dark:text-zinc-300"
          >
            {category.name}
          </li>
        ))}
      </ul>
    </div>
  );
}
