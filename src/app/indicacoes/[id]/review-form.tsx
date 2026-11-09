"use client";

import { useActionState, useState } from "react";
import { submitReviewAction } from "./review-actions";

export default function ReviewForm({
  indicacaoId,
  existingReview,
}: {
  indicacaoId: string;
  existingReview: { stars: number; recommend: boolean } | null;
}) {
  const [state, formAction, pending] = useActionState(submitReviewAction, null);
  const [stars, setStars] = useState(existingReview?.stars ?? 5);
  const [recommend, setRecommend] = useState(existingReview?.recommend ?? true);

  return (
    <form
      action={formAction}
      className="flex flex-col gap-3 rounded-lg border border-zinc-200 p-4 dark:border-zinc-800"
    >
      <input type="hidden" name="indicacaoId" value={indicacaoId} />
      <input type="hidden" name="stars" value={stars} readOnly />
      <input type="hidden" name="recommend" value={recommend ? "true" : "false"} readOnly />

      <p className="text-sm font-medium text-zinc-900 dark:text-zinc-50">
        {existingReview ? "Sua avaliação" : "Avaliar"}
      </p>

      <div className="-ml-2 flex">
        {[1, 2, 3, 4, 5].map((value) => (
          <button
            key={value}
            type="button"
            onClick={() => setStars(value)}
            aria-label={`${value} estrela${value > 1 ? "s" : ""}`}
            className={`flex h-11 w-11 items-center justify-center text-3xl leading-none ${value <= stars ? "text-amber-500" : "text-zinc-300 dark:text-zinc-700"}`}
          >
            ★
          </button>
        ))}
      </div>

      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => setRecommend(true)}
          className={`rounded-md border px-4 py-2.5 text-sm font-medium ${
            recommend
              ? "border-green-600 bg-green-50 text-green-700 dark:border-green-500 dark:bg-green-950 dark:text-green-400"
              : "border-zinc-300 text-zinc-600 dark:border-zinc-700 dark:text-zinc-400"
          }`}
        >
          Recomendo
        </button>
        <button
          type="button"
          onClick={() => setRecommend(false)}
          className={`rounded-md border px-4 py-2.5 text-sm font-medium ${
            !recommend
              ? "border-red-600 bg-red-50 text-red-700 dark:border-red-500 dark:bg-red-950 dark:text-red-400"
              : "border-zinc-300 text-zinc-600 dark:border-zinc-700 dark:text-zinc-400"
          }`}
        >
          Não recomendo
        </button>
      </div>

      {state?.error && <p className="text-sm text-red-600 dark:text-red-400">{state.error}</p>}

      <button
        type="submit"
        disabled={pending}
        className="self-start rounded-full bg-zinc-900 px-5 py-2.5 text-sm font-medium text-white disabled:opacity-60 dark:bg-zinc-50 dark:text-zinc-900"
      >
        {pending ? "Salvando..." : existingReview ? "Atualizar avaliação" : "Enviar avaliação"}
      </button>
    </form>
  );
}
