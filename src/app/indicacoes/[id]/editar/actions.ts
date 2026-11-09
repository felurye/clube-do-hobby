"use server";

import { redirect, notFound } from "next/navigation";
import { revalidatePath } from "next/cache";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { indicacaoSchema } from "@/lib/validation";
import { isModeratorOrAbove } from "@/lib/roles";
import { findPossibleDuplicate } from "@/lib/duplicates";

export type UpdateIndicacaoState =
  | { status: "error"; message: string }
  | { status: "duplicate"; duplicateId: string; duplicateTitle: string }
  | null;

export async function updateIndicacaoAction(
  _prevState: UpdateIndicacaoState,
  formData: FormData,
): Promise<UpdateIndicacaoState> {
  const session = await auth();
  if (!session?.user) {
    return { status: "error", message: "Voce precisa estar logado." };
  }

  const id = String(formData.get("id") ?? "");
  const existing = await prisma.indicacao.findUnique({ where: { id } });
  if (!existing) notFound();

  const canEdit = session.user.id === existing.authorId || isModeratorOrAbove(session.user.role);
  if (!canEdit) {
    return { status: "error", message: "Voce nao tem permissao para editar essa indicacao." };
  }

  const parsed = indicacaoSchema.safeParse({
    title: formData.get("title"),
    categoryId: formData.get("categoryId"),
    description: formData.get("description"),
    address: formData.get("address"),
    neighborhood: formData.get("neighborhood"),
    city: formData.get("city"),
    phone: formData.get("phone"),
    instagram: formData.get("instagram"),
  });

  if (!parsed.success) {
    return { status: "error", message: parsed.error.issues[0]?.message ?? "Dados invalidos." };
  }

  const confirmedDuplicate = formData.get("confirmedDuplicate") === "true";

  if (!confirmedDuplicate) {
    const duplicate = await findPossibleDuplicate(parsed.data, id);
    if (duplicate) {
      return { status: "duplicate", duplicateId: duplicate.id, duplicateTitle: duplicate.title };
    }
  }

  await prisma.indicacao.update({ where: { id }, data: parsed.data });

  revalidatePath("/indicacoes");
  revalidatePath(`/indicacoes/${id}`);
  redirect(`/indicacoes/${id}`);
}
