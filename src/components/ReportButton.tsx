"use client";

import { useActionState, useState } from "react";
import { createReportAction } from "@/app/moderacao/denuncias/actions";

export default function ReportButton({
  targetType,
  targetId,
}: {
  targetType: "INDICACAO" | "COMMENT";
  targetId: string;
}) {
  const [open, setOpen] = useState(false);
  const [state, formAction, pending] = useActionState(createReportAction, null);

  if (state && "success" in state) {
    return <p className="text-xs text-zinc-500 dark:text-zinc-400">Denúncia enviada, obrigado.</p>;
  }

  if (!open) {
    return (
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="inline-flex min-h-9 items-center text-xs text-zinc-500 underline dark:text-zinc-400"
      >
        Denunciar
      </button>
    );
  }

  return (
    <form action={formAction} className="mt-1 flex flex-col gap-2">
      <input type="hidden" name="targetType" value={targetType} readOnly />
      <input type="hidden" name="targetId" value={targetId} readOnly />
      <textarea
        name="reason"
        required
        rows={2}
        maxLength={500}
        placeholder="Por que isso deveria ser removido?"
        className="rounded-md border border-zinc-300 px-2 py-1 text-xs text-zinc-900 outline-none focus:border-zinc-500 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-50"
      />
      {state?.error && <p className="text-xs text-red-600 dark:text-red-400">{state.error}</p>}
      <div className="flex gap-2">
        <button
          type="submit"
          disabled={pending}
          className="rounded-md border border-red-400 px-3 py-2 text-xs font-medium text-red-700 disabled:opacity-60 dark:text-red-400"
        >
          {pending ? "Enviando..." : "Enviar denúncia"}
        </button>
        <button
          type="button"
          onClick={() => setOpen(false)}
          className="px-2 py-2 text-xs text-zinc-500 dark:text-zinc-400"
        >
          Cancelar
        </button>
      </div>
    </form>
  );
}
