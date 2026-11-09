import Link from "next/link";
import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import type { Prisma } from "@prisma/client";

export const metadata: Metadata = {
  title: "Indicações | Clube do Hobby",
};

export default async function IndicacoesPage({
  searchParams,
}: PageProps<"/indicacoes">) {
  const params = await searchParams;
  const categoryId = typeof params.categoria === "string" ? params.categoria : undefined;
  const city = typeof params.cidade === "string" ? params.cidade.trim() : undefined;
  const query = typeof params.busca === "string" ? params.busca.trim() : undefined;

  const where: Prisma.IndicacaoWhereInput = {};
  if (categoryId) where.categoryId = categoryId;
  if (city) where.city = { contains: city, mode: "insensitive" };
  if (query) {
    where.OR = [
      { title: { contains: query, mode: "insensitive" } },
      { description: { contains: query, mode: "insensitive" } },
      { comments: { some: { body: { contains: query, mode: "insensitive" } } } },
    ];
  }

  const [indicacoes, categories] = await Promise.all([
    prisma.indicacao.findMany({
      where,
      include: {
        category: true,
        reviews: { select: { stars: true, recommend: true } },
      },
      orderBy: { createdAt: "desc" },
    }),
    prisma.category.findMany({ orderBy: { name: "asc" } }),
  ]);

  return (
    <div className="mx-auto w-full max-w-4xl flex-1 px-6 py-10">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-4xl text-zinc-900 dark:text-zinc-50">Indicações</h1>
        <Link
          href="/indicacoes/nova"
          className="whitespace-nowrap rounded-full bg-zinc-900 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-zinc-800 dark:bg-zinc-50 dark:text-zinc-900"
        >
          Nova indicação
        </Link>
      </div>

      <form className="mt-6 grid grid-cols-[1fr_auto] gap-3 sm:flex sm:flex-wrap" method="get">
        <input
          name="busca"
          type="text"
          defaultValue={query ?? ""}
          placeholder="Buscar por nome, descrição ou comentários"
          className="col-span-2 rounded-md sm:min-w-[240px] sm:flex-1 border border-zinc-300 px-3 py-2 text-sm text-zinc-900 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-50"
        />
        <select
          name="categoria"
          defaultValue={categoryId ?? ""}
          className="col-span-2 rounded-md border border-zinc-300 px-3 py-2 text-sm text-zinc-900 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-50"
        >
          <option value="">Todas as categorias</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
        <input
          name="cidade"
          type="text"
          defaultValue={city ?? ""}
          placeholder="Bairro ou cidade"
          className="rounded-md border border-zinc-300 px-3 py-2 text-sm text-zinc-900 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-50"
        />
        <button
          type="submit"
          className="rounded-md border border-zinc-300 px-4 py-2 text-sm font-medium text-zinc-700 dark:border-zinc-700 dark:text-zinc-300"
        >
          Filtrar
        </button>
      </form>

      <ul className="mt-6 flex flex-col gap-3">
        {indicacoes.map((indicacao) => {
          const reviewCount = indicacao.reviews.length;
          const avgStars = reviewCount
            ? indicacao.reviews.reduce((sum, r) => sum + r.stars, 0) / reviewCount
            : null;
          const recommendCount = indicacao.reviews.filter((r) => r.recommend).length;

          return (
            <li key={indicacao.id}>
              <Link
                href={`/indicacoes/${indicacao.id}`}
                className="flex flex-col gap-1.5 rounded-lg border-2 border-ink bg-white px-5 py-4 transition hover:-translate-y-0.5 hover:shadow-stamp dark:border-zinc-700 dark:bg-zinc-900 dark:hover:border-petal-400 dark:hover:shadow-none"
              >
                <div className="flex items-start justify-between gap-3">
                  <span className="font-display text-lg font-bold text-zinc-900 dark:text-zinc-50">{indicacao.title}</span>
                  <span className="mt-0.5 shrink-0 whitespace-nowrap rounded-full bg-petal-100 px-2.5 py-0.5 text-xs font-medium text-petal-800 dark:bg-petal-900 dark:text-petal-100">{indicacao.category.name}</span>
                </div>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 line-clamp-2">{indicacao.description}</p>
                <div className="flex gap-3 text-xs text-zinc-500 dark:text-zinc-400">
                  {(indicacao.neighborhood || indicacao.city) && (
                    <span>
                      {[indicacao.neighborhood, indicacao.city].filter(Boolean).join(", ")}
                    </span>
                  )}
                  {avgStars !== null && <span>{avgStars.toFixed(1)} estrelas ({reviewCount})</span>}
                  {reviewCount > 0 && <span>{recommendCount}/{reviewCount} recomendam</span>}
                </div>
              </Link>
            </li>
          );
        })}
        {indicacoes.length === 0 && (
          <li className="text-sm text-zinc-500 dark:text-zinc-400">
            Nenhuma indicação encontrada com esses filtros.
          </li>
        )}
      </ul>
    </div>
  );
}
