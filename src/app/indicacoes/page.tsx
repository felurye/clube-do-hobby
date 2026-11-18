import Link from "next/link";
import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import type { Prisma } from "@prisma/client";
import { getCategoryBandClass } from "@/lib/categoryColor";

export const metadata: Metadata = {
  title: "Indicações | Clube do Hobby",
};

const inputClass =
  "min-h-[50px] flex-1 min-w-0 border-0 bg-transparent font-sans text-base text-foreground outline-none placeholder:text-zinc-500";
const fieldClass =
  "flex min-h-[50px] flex-1 items-center gap-2.5 rounded-2xl border-2 border-line px-3.5";

export default async function IndicacoesPage({
  searchParams,
}: PageProps<"/indicacoes">) {
  const [params, session] = await Promise.all([searchParams, auth()]);
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

  const categoryIds = categories.map((category) => category.id);

  // Mantém os outros filtros ao trocar de categoria ou limpar a busca por um link.
  const chipHref = (nextCategoryId?: string) => {
    const qs = new URLSearchParams();
    if (query) qs.set("busca", query);
    if (city) qs.set("cidade", city);
    if (nextCategoryId) qs.set("categoria", nextCategoryId);
    const search = qs.toString();
    return search ? `/indicacoes?${search}` : "/indicacoes";
  };

  const chipClass = (active: boolean) =>
    `inline-flex min-h-11 flex-none items-center rounded-full border-2 px-4 text-sm font-bold whitespace-nowrap transition-colors ${
      active
        ? "border-ink bg-ink text-paper"
        : "border-line text-foreground hover:border-zinc-400"
    }`;

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-7 px-6 py-10 sm:py-14">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          {session?.user && (
            <p className="mb-1.5 text-sm font-semibold uppercase tracking-[0.08em] text-roma-700 dark:text-roma-300">
              Olá, {session.user.name}
            </p>
          )}
          <h1 className="font-display text-[clamp(2.25rem,5vw,3.5rem)] font-black leading-[1.05] text-foreground">
            Indicações
          </h1>
        </div>
        <Link
          href="/indicacoes/nova"
          className="inline-flex min-h-12 items-center gap-2 whitespace-nowrap rounded-full bg-roma-400 px-5.5 py-3 font-semibold text-ink transition-transform hover:-translate-y-0.5"
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.4"
            strokeLinecap="round"
            aria-hidden="true"
          >
            <path d="M12 5v14M5 12h14" />
          </svg>
          Nova indicação
        </Link>
      </div>

      <form
        method="get"
        className="flex flex-col gap-3 rounded-[22px] bg-surface p-4.5 sm:flex-row sm:flex-wrap"
      >
        <label className={`${fieldClass} basis-full sm:basis-64 sm:flex-[2]`}>
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            className="shrink-0 text-zinc-600 dark:text-zinc-400"
            aria-hidden="true"
          >
            <circle cx="11" cy="11" r="7" />
            <path d="M20 20l-4-4" />
          </svg>
          <span className="sr-only">Buscar</span>
          <input
            name="busca"
            type="search"
            defaultValue={query ?? ""}
            placeholder="Buscar por nome, descrição ou comentário"
            className={inputClass}
          />
        </label>

        <label className={`${fieldClass} basis-full sm:basis-48 sm:flex-1`}>
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinejoin="round"
            className="shrink-0 text-zinc-600 dark:text-zinc-400"
            aria-hidden="true"
          >
            <path d="M12 21s-7-6.2-7-11.5A7 7 0 0 1 19 9.5C19 14.8 12 21 12 21z" />
            <circle cx="12" cy="9.5" r="2.5" />
          </svg>
          <span className="sr-only">Bairro ou cidade</span>
          <input
            name="cidade"
            type="text"
            defaultValue={city ?? ""}
            placeholder="Bairro ou cidade"
            className={inputClass}
          />
        </label>

        <div className="flex basis-full flex-wrap gap-2 sm:flex-1 sm:basis-full sm:flex-nowrap sm:overflow-x-auto">
          <Link href={chipHref()} className={chipClass(!categoryId)}>
            Todas
          </Link>
          {categories.map((category) => (
            <Link
              key={category.id}
              href={chipHref(category.id)}
              className={chipClass(categoryId === category.id)}
            >
              {category.name}
            </Link>
          ))}
        </div>

        <button
          type="submit"
          className="min-h-11 flex-none rounded-full border-2 border-line px-5 text-sm font-bold text-foreground transition-colors hover:border-zinc-400 sm:self-start"
        >
          Filtrar
        </button>
      </form>

      <p className="text-sm text-zinc-600 dark:text-zinc-400">
        {indicacoes.length === 1 ? "1 indicação" : `${indicacoes.length} indicações`}
      </p>

      <div className="grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-5">
        {indicacoes.map((indicacao) => {
          const reviewCount = indicacao.reviews.length;
          const avgStars = reviewCount
            ? indicacao.reviews.reduce((sum, r) => sum + r.stars, 0) / reviewCount
            : null;
          const recommendCount = indicacao.reviews.filter((r) => r.recommend).length;
          const recommended = reviewCount > 0 && recommendCount * 2 >= reviewCount;

          return (
            <Link
              key={indicacao.id}
              href={`/indicacoes/${indicacao.id}`}
              className="flex flex-col overflow-hidden rounded-[22px] bg-surface transition hover:-translate-y-0.5 hover:shadow-stamp dark:hover:shadow-none dark:hover:ring-2 dark:hover:ring-roma-400"
            >
              <div className={`h-2.5 ${getCategoryBandClass(categoryIds, indicacao.categoryId)}`} />
              <div className="flex flex-1 flex-col gap-2.5 p-5">
                <div className="flex items-center justify-between gap-2">
                  <span className="rounded-full bg-background px-2.5 py-1 text-xs font-semibold uppercase tracking-[0.06em] text-zinc-700 dark:text-zinc-300">
                    {indicacao.category.name}
                  </span>
                  {recommended && (
                    <span className="shrink-0 rounded-full bg-oliveira px-2.5 py-1 text-xs font-bold text-paper">
                      Recomendam
                    </span>
                  )}
                </div>
                <h2 className="font-display text-xl font-extrabold leading-[1.15] text-foreground">
                  {indicacao.title}
                </h2>
                <div className="flex items-center gap-1.5 text-sm text-zinc-700 dark:text-zinc-300">
                  {avgStars !== null ? (
                    <>
                      <StarIcon />
                      <strong>{avgStars.toFixed(1)}</strong> · {reviewCount}{" "}
                      {reviewCount === 1 ? "avaliação" : "avaliações"}
                    </>
                  ) : (
                    <span className="text-zinc-500 dark:text-zinc-400">Ainda sem avaliações</span>
                  )}
                </div>
                {(indicacao.neighborhood || indicacao.city) && (
                  <p className="mt-auto text-sm text-zinc-600 dark:text-zinc-400">
                    {[indicacao.neighborhood, indicacao.city].filter(Boolean).join(", ")}
                  </p>
                )}
              </div>
            </Link>
          );
        })}
      </div>

      {indicacoes.length === 0 && (
        <div className="rounded-[22px] bg-background p-10 text-center text-zinc-700 dark:bg-zinc-900 dark:text-zinc-300">
          Nenhuma indicação encontrada com esses filtros.
        </div>
      )}
    </div>
  );
}

function StarIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="text-roma-600" aria-hidden="true">
      <path d="M12 2l3 7 7 .6-5.3 4.7 1.6 7.2L12 17.8 5.7 21.5l1.6-7.2L2 9.6 9 9z" />
    </svg>
  );
}
