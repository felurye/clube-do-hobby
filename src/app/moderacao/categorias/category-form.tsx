"use client";

import { useActionState } from "react";
import { addCategoryAction } from "./actions";

export default function CategoryForm() {
  const [state, formAction, pending] = useActionState(addCategoryAction, null);

  return (
    <form action={formAction} className="mt-6 flex flex-col gap-2">
      <div className="flex items-end gap-3">
        <label className="flex flex-1 flex-col gap-1 text-sm text-zinc-700 dark:text-zinc-300">
          Nova categoria
          <input
            name="name"
            type="text"
            required
            maxLength={60}
            placeholder="Ex: Jardinagem"
            className="rounded-md border border-zinc-300 px-3 py-2 text-zinc-900 outline-none focus:border-zinc-500 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-50"
          />
        </label>
        <button
          type="submit"
          disabled={pending}
          className="rounded-full bg-zinc-900 px-4 py-2 text-sm font-medium text-white disabled:opacity-60 dark:bg-zinc-50 dark:text-zinc-900"
        >
          Adicionar
        </button>
      </div>
      {state?.error && <p className="text-sm text-red-600 dark:text-red-400">{state.error}</p>}
    </form>
  );
}
