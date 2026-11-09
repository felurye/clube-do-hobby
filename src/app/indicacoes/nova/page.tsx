import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import IndicacaoForm from "./indicacao-form";

export const metadata: Metadata = {
  title: "Nova indicação | Clube do Hobby",
};

export default async function NovaIndicacaoPage() {
  const categories = await prisma.category.findMany({ orderBy: { name: "asc" } });

  return (
    <div className="mx-auto w-full max-w-xl flex-1 px-6 py-10">
      <h1 className="text-3xl text-zinc-900 dark:text-zinc-50">
        Nova indicação
      </h1>
      <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
        Conte pra comunidade sobre um profissional, empresa ou lugar de confiança.
      </p>

      <IndicacaoForm categories={categories} />
    </div>
  );
}
