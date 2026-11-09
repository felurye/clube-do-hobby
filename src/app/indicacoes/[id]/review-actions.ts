"use server";

import { revalidatePath } from "next/cache";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { reviewSchema, commentSchema } from "@/lib/validation";

export type ReviewState = { error: string } | null;

export async function submitReviewAction(
  _prevState: ReviewState,
  formData: FormData,
): Promise<ReviewState> {
  const session = await auth();
  if (!session?.user) {
    return { error: "Voce precisa estar logado." };
  }

  const indicacaoId = String(formData.get("indicacaoId") ?? "");
  const indicacao = await prisma.indicacao.findUnique({ where: { id: indicacaoId } });
  if (!indicacao) return { error: "Indicação não encontrada." };

  if (indicacao.authorId === session.user.id) {
    return { error: "Você não pode avaliar a própria indicação." };
  }

  const parsed = reviewSchema.safeParse({
    stars: formData.get("stars"),
    recommend: formData.get("recommend"),
  });

  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Dados inválidos." };
  }

  await prisma.review.upsert({
    where: { indicacaoId_authorId: { indicacaoId, authorId: session.user.id } },
    create: { indicacaoId, authorId: session.user.id, ...parsed.data },
    update: parsed.data,
  });

  revalidatePath(`/indicacoes/${indicacaoId}`);
  revalidatePath("/indicacoes");
  return null;
}

export type CommentState = { error: string } | null;

export async function createCommentAction(
  _prevState: CommentState,
  formData: FormData,
): Promise<CommentState> {
  const session = await auth();
  if (!session?.user) {
    return { error: "Voce precisa estar logado." };
  }

  const indicacaoId = String(formData.get("indicacaoId") ?? "");
  const parsed = commentSchema.safeParse({ body: formData.get("body") });
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Dados inválidos." };
  }

  await prisma.comment.create({
    data: { indicacaoId, authorId: session.user.id, body: parsed.data.body },
  });

  revalidatePath(`/indicacoes/${indicacaoId}`);
  return null;
}
