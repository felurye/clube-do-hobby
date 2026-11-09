"use server";

import { revalidatePath } from "next/cache";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { isModeratorOrAbove } from "@/lib/roles";
import { reportSchema } from "@/lib/validation";

export type ReportState = { error: string } | { success: true } | null;

export async function createReportAction(
  _prevState: ReportState,
  formData: FormData,
): Promise<ReportState> {
  const session = await auth();
  if (!session?.user) {
    return { error: "Voce precisa estar logado." };
  }

  const targetType = formData.get("targetType") === "COMMENT" ? "COMMENT" : "INDICACAO";
  const indicacaoId = targetType === "INDICACAO" ? String(formData.get("targetId") ?? "") : undefined;
  const commentId = targetType === "COMMENT" ? String(formData.get("targetId") ?? "") : undefined;

  const parsed = reportSchema.safeParse({ reason: formData.get("reason") });
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Dados inválidos." };
  }

  await prisma.report.create({
    data: {
      targetType,
      indicacaoId,
      commentId,
      reason: parsed.data.reason,
      reporterId: session.user.id,
    },
  });

  if (indicacaoId) revalidatePath(`/indicacoes/${indicacaoId}`);
  revalidatePath("/moderacao/denuncias");
  return { success: true };
}

export async function resolveReportAction(formData: FormData) {
  const session = await auth();
  if (!isModeratorOrAbove(session?.user?.role)) {
    throw new Error("Apenas moderadores e admins podem tratar denúncias.");
  }

  const reportId = String(formData.get("reportId") ?? "");
  const resolution = formData.get("resolution") === "remove" ? "remove" : "dismiss";

  const report = await prisma.report.findUnique({ where: { id: reportId } });
  if (!report) return;

  if (resolution === "remove") {
    if (report.indicacaoId) {
      await prisma.indicacao.delete({ where: { id: report.indicacaoId } });
    } else if (report.commentId) {
      await prisma.comment.delete({ where: { id: report.commentId } });
    }
  } else {
    await prisma.report.update({
      where: { id: reportId },
      data: { status: "DISMISSED", resolvedAt: new Date(), resolvedById: session!.user.id },
    });
  }

  revalidatePath("/moderacao/denuncias");
  revalidatePath("/indicacoes");
}
