"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import { createCommentAction } from "./review-actions";

export default function CommentForm({ indicacaoId }: { indicacaoId: string }) {
  const [state, formAction, pending] = useActionState(createCommentAction, null);
  const [body, setBody] = useState("");
  const wasPending = useRef(false);

  useEffect(() => {
    if (wasPending.current && !pending && !state?.error) {
      setBody("");
    }
    wasPending.current = pending;
  }, [pending, state]);

  return (
    <form action={formAction} className="flex flex-col gap-2">
      <input type="hidden" name="indicacaoId" value={indicacaoId} readOnly />
      <textarea
        name="body"
        required
        rows={2}
        maxLength={1000}
        placeholder="Escreva um comentário..."
        value={body}
        onChange={(e) => setBody(e.target.value)}
        className="rounded-2xl border-2 border-line bg-background px-3.5 py-2.5 text-sm text-foreground outline-none focus:border-zinc-400"
      />
      {state?.error && <p className="text-sm text-red-600 dark:text-red-400">{state.error}</p>}
      <button
        type="submit"
        disabled={pending}
        className="self-start rounded-full border-2 border-line px-4 py-2.5 text-sm font-bold text-foreground transition-colors hover:border-zinc-400 disabled:opacity-60"
      >
        {pending ? "Enviando..." : "Comentar"}
      </button>
    </form>
  );
}
