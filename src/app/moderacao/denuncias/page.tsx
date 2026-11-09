import Link from "next/link";
import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { resolveReportAction } from "./actions";
import ConfirmSubmitButton from "@/components/ConfirmSubmitButton";

export const metadata: Metadata = {
  title: "Denúncias | Clube do Hobby",
};

export default async function DenunciasPage() {
  const reports = await prisma.report.findMany({
    where: { status: "PENDING" },
    include: {
      reporter: { select: { name: true } },
      indicacao: { select: { id: true, title: true } },
      comment: { select: { id: true, body: true, indicacaoId: true, author: { select: { name: true } } } },
    },
    orderBy: { createdAt: "asc" },
  });

  return (
    <div className="mx-auto w-full max-w-2xl flex-1 px-6 py-10">
      <h1 className="text-3xl text-zinc-900 dark:text-zinc-50">
        Denúncias pendentes ({reports.length})
      </h1>

      <ul className="mt-6 flex flex-col gap-4">
        {reports.map((report) => (
          <li key={report.id} className="rounded-lg border border-zinc-200 p-4 dark:border-zinc-800">
            <p className="text-xs text-zinc-500 dark:text-zinc-400">
              Denunciado por {report.reporter.name} - {report.targetType === "INDICACAO" ? "indicação" : "comentário"}
            </p>

            {report.indicacao && (
              <Link
                href={`/indicacoes/${report.indicacao.id}`}
                target="_blank"
                className="mt-1 block font-medium text-zinc-900 underline dark:text-zinc-50"
              >
                {report.indicacao.title}
              </Link>
            )}

            {report.comment && (
              <div className="mt-1">
                <Link
                  href={`/indicacoes/${report.comment.indicacaoId}`}
                  target="_blank"
                  className="text-sm font-medium text-zinc-900 underline dark:text-zinc-50"
                >
                  Ver indicação
                </Link>
                <p className="mt-1 rounded bg-zinc-100 p-2 text-sm text-zinc-700 dark:bg-zinc-900 dark:text-zinc-300">
                  {report.comment.author.name}: {report.comment.body}
                </p>
              </div>
            )}

            <p className="mt-2 text-sm text-zinc-700 dark:text-zinc-300">
              <span className="font-medium">Motivo:</span> {report.reason}
            </p>

            <div className="mt-3 flex flex-wrap gap-2">
              <form action={resolveReportAction}>
                <input type="hidden" name="reportId" value={report.id} />
                <input type="hidden" name="resolution" value="remove" />
                <ConfirmSubmitButton
                  confirmMessage={
                    report.targetType === "INDICACAO"
                      ? "Remover esta indicação? Avaliações e comentários dela também serão apagados."
                      : "Remover este comentário?"
                  }
                  className="rounded-md border border-red-400 px-3 py-1.5 text-sm font-medium text-red-700 dark:text-red-400"
                >
                  Remover conteúdo
                </ConfirmSubmitButton>
              </form>
              <form action={resolveReportAction}>
                <input type="hidden" name="reportId" value={report.id} />
                <input type="hidden" name="resolution" value="dismiss" />
                <button
                  type="submit"
                  className="rounded-md border border-zinc-300 px-3 py-1.5 text-sm font-medium text-zinc-700 dark:border-zinc-700 dark:text-zinc-300"
                >
                  Descartar denúncia
                </button>
              </form>
            </div>
          </li>
        ))}
        {reports.length === 0 && (
          <li className="text-sm text-zinc-500 dark:text-zinc-400">Nenhuma denúncia pendente.</li>
        )}
      </ul>
    </div>
  );
}
