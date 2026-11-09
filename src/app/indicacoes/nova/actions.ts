"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { indicacaoSchema } from "@/lib/validation";
import { findPossibleDuplicate } from "@/lib/duplicates";

export type CreateIndicacaoState =
  | { status: "error"; message: string }
  | { status: "duplicate"; duplicateId: string; duplicateTitle: string }
  | null;

export async function createIndicacaoAction(
  _prevState: CreateIndicacaoState,
  formData: FormData,
): Promise<CreateIndicacaoState> {
  const session = await auth();
  if (!session?.user) {
    return { status: "error", message: "Voce precisa estar logado." };
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
    const duplicate = await findPossibleDuplicate(parsed.data);
    if (duplicate) {
      return { status: "duplicate", duplicateId: duplicate.id, duplicateTitle: duplicate.title };
    }
  }

  const created = await prisma.indicacao.create({
    data: { ...parsed.data, authorId: session.user.id },
  });

  revalidatePath("/indicacoes");
  redirect(`/indicacoes/${created.id}`);
}
