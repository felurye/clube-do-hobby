"use server";

import { revalidatePath } from "next/cache";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { isAdmin } from "@/lib/roles";

async function requireAdmin() {
  const session = await auth();
  if (!isAdmin(session?.user?.role)) {
    throw new Error("Apenas administradores podem gerenciar os destaques.");
  }
  return session!.user.id;
}

export async function addHighlightAction(formData: FormData) {
  const userId = await requireAdmin();

  const url = String(formData.get("url") ?? "").trim();
  const kind = String(formData.get("kind") ?? "POST") === "EVENT" ? "EVENT" : "POST";
  const caption = String(formData.get("caption") ?? "").trim() || null;

  if (!url.startsWith("https://www.instagram.com/") && !url.startsWith("https://instagram.com/")) {
    throw new Error("Cole um link valido de um post do Instagram.");
  }

  const count = await prisma.instagramHighlight.count({ where: { kind } });

  await prisma.instagramHighlight.create({
    data: { url, kind, caption, position: count, createdById: userId },
  });

  revalidatePath("/");
  revalidatePath("/admin/destaques");
}

export async function removeHighlightAction(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");
  await prisma.instagramHighlight.delete({ where: { id } });

  revalidatePath("/");
  revalidatePath("/admin/destaques");
}
