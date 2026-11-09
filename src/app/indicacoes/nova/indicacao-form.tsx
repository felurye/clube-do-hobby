"use client";

import { useActionState, useState } from "react";
import Link from "next/link";
import { createIndicacaoAction } from "./actions";
import type { Category } from "@prisma/client";

const emptyForm = {
  title: "",
  categoryId: "",
  description: "",
  address: "",
  neighborhood: "",
  city: "",
  phone: "",
  instagram: "",
};

export default function IndicacaoForm({ categories }: { categories: Category[] }) {
  const [state, formAction, pending] = useActionState(createIndicacaoAction, null);
  const [fields, setFields] = useState(emptyForm);

  function setField<K extends keyof typeof emptyForm>(key: K, value: string) {
    setFields((prev) => ({ ...prev, [key]: value }));
  }

  return (
    <form
      action={formAction}
      className="mt-6 flex flex-col gap-4 rounded-xl border border-zinc-200 p-6 dark:border-zinc-800"
    >
      <label className="flex flex-col gap-1 text-sm text-zinc-700 dark:text-zinc-300">
        Nome
        <input
          name="title"
          type="text"
          required
          maxLength={120}
          value={fields.title}
          onChange={(e) => setField("title", e.target.value)}
          className="rounded-md border border-zinc-300 px-3 py-2 text-zinc-900 outline-none focus:border-zinc-500 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-50"
        />
      </label>

      <label className="flex flex-col gap-1 text-sm text-zinc-700 dark:text-zinc-300">
        Categoria
        <select
          name="categoryId"
          required
          value={fields.categoryId}
          onChange={(e) => setField("categoryId", e.target.value)}
          className="rounded-md border border-zinc-300 px-3 py-2 text-zinc-900 outline-none focus:border-zinc-500 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-50"
        >
          <option value="">Selecione...</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </label>

      <label className="flex flex-col gap-1 text-sm text-zinc-700 dark:text-zinc-300">
        Descrição
        <textarea
          name="description"
          required
          rows={4}
          maxLength={2000}
          placeholder="O que essa pessoa/empresa/lugar faz, e por que voce indica"
          value={fields.description}
          onChange={(e) => setField("description", e.target.value)}
          className="rounded-md border border-zinc-300 px-3 py-2 text-zinc-900 outline-none focus:border-zinc-500 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-50"
        />
      </label>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="flex flex-col gap-1 text-sm text-zinc-700 dark:text-zinc-300">
          Endereço
          <input
            name="address"
            type="text"
            maxLength={200}
            value={fields.address}
            onChange={(e) => setField("address", e.target.value)}
            className="rounded-md border border-zinc-300 px-3 py-2 text-zinc-900 outline-none focus:border-zinc-500 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-50"
          />
        </label>
        <label className="flex flex-col gap-1 text-sm text-zinc-700 dark:text-zinc-300">
          Bairro/cidade
          <input
            name="neighborhood"
            type="text"
            maxLength={200}
            placeholder="Bairro"
            value={fields.neighborhood}
            onChange={(e) => setField("neighborhood", e.target.value)}
            className="mb-1 rounded-md border border-zinc-300 px-3 py-2 text-zinc-900 outline-none focus:border-zinc-500 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-50"
          />
          <input
            name="city"
            type="text"
            maxLength={200}
            placeholder="Cidade"
            value={fields.city}
            onChange={(e) => setField("city", e.target.value)}
            className="rounded-md border border-zinc-300 px-3 py-2 text-zinc-900 outline-none focus:border-zinc-500 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-50"
          />
        </label>
        <label className="flex flex-col gap-1 text-sm text-zinc-700 dark:text-zinc-300">
          Telefone
          <input
            name="phone"
            type="text"
            maxLength={200}
            value={fields.phone}
            onChange={(e) => setField("phone", e.target.value)}
            className="rounded-md border border-zinc-300 px-3 py-2 text-zinc-900 outline-none focus:border-zinc-500 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-50"
          />
        </label>
        <label className="flex flex-col gap-1 text-sm text-zinc-700 dark:text-zinc-300">
          Instagram
          <input
            name="instagram"
            type="text"
            maxLength={200}
            placeholder="@usuario"
            value={fields.instagram}
            onChange={(e) => setField("instagram", e.target.value)}
            className="rounded-md border border-zinc-300 px-3 py-2 text-zinc-900 outline-none focus:border-zinc-500 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-50"
          />
        </label>
      </div>

      {state?.status === "error" && (
        <p className="text-sm text-red-600 dark:text-red-400">{state.message}</p>
      )}

      {state?.status === "duplicate" && (
        <div className="flex flex-col gap-2 rounded-md border border-amber-300 bg-amber-50 p-3 text-sm text-amber-900 dark:border-amber-700 dark:bg-amber-950 dark:text-amber-200">
          <p>
            Já existe uma indicação parecida:{" "}
            <Link
              href={`/indicacoes/${state.duplicateId}`}
              target="_blank"
              className="font-medium underline"
            >
              {state.duplicateTitle}
            </Link>
            . Confira se não é a mesma antes de continuar.
          </p>
          <button
            type="submit"
            name="confirmedDuplicate"
            value="true"
            className="self-start rounded-md border border-amber-400 px-3 py-1.5 font-medium"
          >
            Não é a mesma, cadastrar assim mesmo
          </button>
        </div>
      )}

      <button
        type="submit"
        name="confirmedDuplicate"
        value="false"
        disabled={pending}
        className="mt-2 self-start rounded-full bg-zinc-900 px-5 py-2 text-sm font-medium text-white disabled:opacity-60 dark:bg-zinc-50 dark:text-zinc-900"
      >
        {pending ? "Salvando..." : "Cadastrar indicação"}
      </button>
    </form>
  );
}
