import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { isModeratorOrAbove } from "@/lib/roles";
import EditIndicacaoForm from "./edit-form";

export const metadata: Metadata = {
  title: "Editar indicação | Clube do Hobby",
};

export default async function EditarIndicacaoPage({ params }: PageProps<"/indicacoes/[id]/editar">) {
  const { id } = await params;
  const [indicacao, categories, session] = await Promise.all([
    prisma.indicacao.findUnique({ where: { id } }),
    prisma.category.findMany({ orderBy: { name: "asc" } }),
    auth(),
  ]);

  if (!indicacao) notFound();

  const canEdit =
    session?.user?.id === indicacao.authorId || isModeratorOrAbove(session?.user?.role);
  if (!canEdit) redirect(`/indicacoes/${id}`);

  return (
    <div className="mx-auto w-full max-w-xl flex-1 px-6 py-10">
      <h1 className="text-3xl text-zinc-900 dark:text-zinc-50">Editar indicação</h1>
      <EditIndicacaoForm indicacao={indicacao} categories={categories} />
    </div>
  );
}
