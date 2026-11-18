import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { isModeratorOrAbove } from "@/lib/roles";
import { getCategoryBandClass } from "@/lib/categoryColor";
import ReviewForm from "./review-form";
import CommentForm from "./comment-form";
import ReportButton from "@/components/ReportButton";

export async function generateMetadata({
  params,
}: PageProps<"/indicacoes/[id]">): Promise<Metadata> {
  const { id } = await params;
  const indicacao = await prisma.indicacao.findUnique({ where: { id }, select: { title: true } });
  return { title: indicacao ? `${indicacao.title} | Clube do Hobby` : "Indicação | Clube do Hobby" };
}

export default async function IndicacaoDetailPage({ params }: PageProps<"/indicacoes/[id]">) {
  const { id } = await params;
  const [indicacao, session, categoryIds] = await Promise.all([
    prisma.indicacao.findUnique({
      where: { id },
      include: {
        category: true,
        author: { select: { id: true, name: true } },
        reviews: { select: { stars: true, recommend: true, authorId: true } },
        comments: {
          include: { author: { select: { name: true } } },
          orderBy: { createdAt: "asc" },
        },
      },
    }),
    auth(),
    prisma.category.findMany({ orderBy: { name: "asc" }, select: { id: true } }).then((cats) =>
      cats.map((c) => c.id),
    ),
  ]);

  if (!indicacao) notFound();

  const reviewCount = indicacao.reviews.length;
  const avgStars = reviewCount
    ? indicacao.reviews.reduce((sum, r) => sum + r.stars, 0) / reviewCount
    : null;
  const recommendCount = indicacao.reviews.filter((r) => r.recommend).length;
  const recommended = reviewCount > 0 && recommendCount * 2 >= reviewCount;

  const canEdit =
    session?.user?.id === indicacao.authorId || isModeratorOrAbove(session?.user?.role);
  const isAuthor = session?.user?.id === indicacao.authorId;
  const myReview = indicacao.reviews.find((r) => r.authorId === session?.user?.id) ?? null;

  const infoRows = [
    indicacao.phone && { label: "Telefone", value: indicacao.phone },
    indicacao.instagram && { label: "Instagram", value: indicacao.instagram },
  ].filter((row): row is { label: string; value: string } => Boolean(row));

  const location = [indicacao.address, indicacao.neighborhood, indicacao.city]
    .filter(Boolean)
    .join(", ");

  return (
    <div className="mx-auto flex w-full max-w-3xl flex-1 flex-col gap-7 px-6 py-10 sm:py-14">
      <Link
        href="/indicacoes"
        className="inline-flex w-fit items-center gap-1.5 text-sm font-semibold text-zinc-600 hover:text-foreground dark:text-zinc-400"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M15 18l-6-6 6-6" />
        </svg>
        Indicações
      </Link>

      <div className="overflow-hidden rounded-[28px] bg-surface">
        <div className={`h-3 ${getCategoryBandClass(categoryIds, indicacao.categoryId)}`} />
        <div className="flex flex-col gap-4 p-6 sm:p-8">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div className="flex flex-col gap-3">
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-full bg-background px-3 py-1 text-xs font-semibold uppercase tracking-[0.06em] text-zinc-700 dark:text-zinc-300">
                  {indicacao.category.name}
                </span>
                {recommended && (
                  <span className="rounded-full bg-oliveira px-3 py-1 text-xs font-bold text-paper">
                    Recomendam
                  </span>
                )}
              </div>
              <h1 className="font-display text-[clamp(1.75rem,4vw,2.75rem)] font-extrabold leading-[1.1] text-foreground">
                {indicacao.title}
              </h1>
            </div>
            {canEdit && (
              <Link
                href={`/indicacoes/${indicacao.id}/editar`}
                className="shrink-0 rounded-full border-2 border-line px-5 py-2.5 text-sm font-bold text-foreground transition-colors hover:border-zinc-400"
              >
                Editar
              </Link>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-sm text-zinc-700 dark:text-zinc-300">
            {avgStars !== null ? (
              <span className="inline-flex items-center gap-1.5">
                <StarIcon />
                <strong>{avgStars.toFixed(1)}</strong> · {reviewCount}{" "}
                {reviewCount === 1 ? "avaliação" : "avaliações"}
              </span>
            ) : (
              <span className="text-zinc-500 dark:text-zinc-400">Ainda sem avaliações</span>
            )}
            {reviewCount > 0 && (
              <span>
                {recommendCount}/{reviewCount} recomendam
              </span>
            )}
          </div>

          <p className="whitespace-pre-wrap text-base text-zinc-700 dark:text-zinc-300">
            {indicacao.description}
          </p>

          {(location || infoRows.length > 0 || indicacao.author.name) && (
            <div className="flex flex-wrap gap-2 border-t border-line pt-4">
              {location && <InfoPill label="Local" value={location} />}
              {infoRows.map((row) => (
                <InfoPill key={row.label} label={row.label} value={row.value} />
              ))}
              <InfoPill label="Indicado por" value={indicacao.author.name} />
            </div>
          )}

          {session?.user && (
            <div>
              <ReportButton targetType="INDICACAO" targetId={indicacao.id} />
            </div>
          )}
        </div>
      </div>

      {!isAuthor && (
        <div className="rounded-[22px] bg-surface p-6 sm:p-7">
          <ReviewForm indicacaoId={indicacao.id} existingReview={myReview} />
        </div>
      )}

      <div className="flex flex-col gap-4">
        <h2 className="font-display text-2xl font-extrabold text-foreground">
          Comentários ({indicacao.comments.length})
        </h2>

        <ul className="flex flex-col gap-3">
          {indicacao.comments.map((comment) => (
            <li key={comment.id} className="flex flex-col gap-2 rounded-[18px] bg-surface p-4">
              <div className="flex items-center gap-2.5">
                <span
                  aria-hidden="true"
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-bombom font-display text-sm font-extrabold text-ink"
                >
                  {comment.author.name.charAt(0).toUpperCase()}
                </span>
                <p className="font-bold text-foreground">{comment.author.name}</p>
              </div>
              <p className="whitespace-pre-wrap text-sm text-zinc-700 dark:text-zinc-300">
                {comment.body}
              </p>
              <ReportButton targetType="COMMENT" targetId={comment.id} />
            </li>
          ))}
          {indicacao.comments.length === 0 && (
            <li className="rounded-[18px] bg-background p-5 text-sm text-zinc-600 dark:bg-zinc-900 dark:text-zinc-400">
              Nenhum comentário ainda.
            </li>
          )}
        </ul>

        <div className="rounded-[22px] bg-surface p-5">
          <CommentForm indicacaoId={indicacao.id} />
        </div>
      </div>
    </div>
  );
}

function InfoPill({ label, value }: { label: string; value: string }) {
  return (
    <span className="rounded-full bg-background px-3.5 py-1.5 text-sm text-zinc-700 dark:bg-zinc-900 dark:text-zinc-300">
      <span className="font-semibold text-foreground">{label}:</span> {value}
    </span>
  );
}

function StarIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" className="text-roma-600" aria-hidden="true">
      <path d="M12 2l3 7 7 .6-5.3 4.7 1.6 7.2L12 17.8 5.7 21.5l1.6-7.2L2 9.6 9 9z" />
    </svg>
  );
}
