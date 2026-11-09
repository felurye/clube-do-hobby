import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { isModeratorOrAbove } from "@/lib/roles";
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
  const [indicacao, session] = await Promise.all([
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
  ]);

  if (!indicacao) notFound();

  const reviewCount = indicacao.reviews.length;
  const avgStars = reviewCount
    ? indicacao.reviews.reduce((sum, r) => sum + r.stars, 0) / reviewCount
    : null;
  const recommendCount = indicacao.reviews.filter((r) => r.recommend).length;

  const canEdit =
    session?.user?.id === indicacao.authorId || isModeratorOrAbove(session?.user?.role);
  const isAuthor = session?.user?.id === indicacao.authorId;
  const myReview = indicacao.reviews.find((r) => r.authorId === session?.user?.id) ?? null;

  return (
    <div className="mx-auto w-full max-w-2xl flex-1 px-6 py-10">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-3xl text-zinc-900 dark:text-zinc-50">{indicacao.title}</h1>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">{indicacao.category.name}</p>
        </div>
        {canEdit && (
          <Link
            href={`/indicacoes/${indicacao.id}/editar`}
            className="shrink-0 rounded-md border border-zinc-300 px-4 py-2 text-sm font-medium text-zinc-700 dark:border-zinc-700 dark:text-zinc-300"
          >
            Editar
          </Link>
        )}
      </div>

      <div className="mt-4 flex flex-wrap gap-x-4 gap-y-1 text-sm text-zinc-600 dark:text-zinc-400">
        {avgStars !== null ? (
          <span>{avgStars.toFixed(1)} estrelas ({reviewCount} avaliações)</span>
        ) : (
          <span>Ainda sem avaliações</span>
        )}
        {reviewCount > 0 && <span>{recommendCount}/{reviewCount} recomendam</span>}
      </div>

      <p className="mt-4 whitespace-pre-wrap text-zinc-800 dark:text-zinc-200">{indicacao.description}</p>

      <dl className="mt-6 grid gap-2 text-sm text-zinc-600 dark:text-zinc-400">
        {(indicacao.address || indicacao.neighborhood || indicacao.city) && (
          <div className="flex gap-2">
            <dt className="font-medium text-zinc-900 dark:text-zinc-50">Endereço:</dt>
            <dd>{[indicacao.address, indicacao.neighborhood, indicacao.city].filter(Boolean).join(", ")}</dd>
          </div>
        )}
        {indicacao.phone && (
          <div className="flex gap-2">
            <dt className="font-medium text-zinc-900 dark:text-zinc-50">Telefone:</dt>
            <dd>{indicacao.phone}</dd>
          </div>
        )}
        {indicacao.instagram && (
          <div className="flex gap-2">
            <dt className="font-medium text-zinc-900 dark:text-zinc-50">Instagram:</dt>
            <dd>{indicacao.instagram}</dd>
          </div>
        )}
        <div className="flex gap-2">
          <dt className="font-medium text-zinc-900 dark:text-zinc-50">Indicado por:</dt>
          <dd>{indicacao.author.name}</dd>
        </div>
      </dl>

      {session?.user && (
        <div className="mt-3">
          <ReportButton targetType="INDICACAO" targetId={indicacao.id} />
        </div>
      )}

      {!isAuthor && (
        <div className="mt-8">
          <ReviewForm indicacaoId={indicacao.id} existingReview={myReview} />
        </div>
      )}

      <div className="mt-8">
        <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
          Comentários ({indicacao.comments.length})
        </h2>

        <ul className="mt-3 flex flex-col gap-3">
          {indicacao.comments.map((comment) => (
            <li key={comment.id} className="rounded-md border border-zinc-200 p-3 text-sm dark:border-zinc-800">
              <p className="font-medium text-zinc-900 dark:text-zinc-50">{comment.author.name}</p>
              <p className="mt-1 whitespace-pre-wrap text-zinc-700 dark:text-zinc-300">{comment.body}</p>
              <div className="mt-2">
                <ReportButton targetType="COMMENT" targetId={comment.id} />
              </div>
            </li>
          ))}
          {indicacao.comments.length === 0 && (
            <li className="text-sm text-zinc-500 dark:text-zinc-400">Nenhum comentário ainda.</li>
          )}
        </ul>

        <div className="mt-4">
          <CommentForm indicacaoId={indicacao.id} />
        </div>
      </div>
    </div>
  );
}
