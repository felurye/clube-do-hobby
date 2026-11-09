"use server";

import { revalidatePath } from "next/cache";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { isModeratorOrAbove } from "@/lib/roles";
import { categorySchema } from "@/lib/validation";
import { slugify } from "@/lib/slug";

export async function addCategoryAction(
  _prevState: { error: string } | null,
  formData: FormData,
): Promise<{ error: string } | null> {
  const session = await auth();
  if (!isModeratorOrAbove(session?.user?.role)) {
    return { error: "Apenas moderadores e admins podem gerenciar categorias." };
  }

  const parsed = categorySchema.safeParse({ name: formData.get("name") });
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Dados invalidos." };
  }

  const slug = slugify(parsed.data.name);
  const existing = await prisma.category.findUnique({ where: { slug } });
  if (existing) {
    return { error: "Essa categoria ja existe." };
  }

  await prisma.category.create({
    data: { name: parsed.data.name, slug, createdById: session!.user.id },
  });

  revalidatePath("/moderacao/categorias");
  revalidatePath("/indicacoes");
  return null;
}
