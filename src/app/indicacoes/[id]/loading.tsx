export default function Loading() {
  return (
    <div className="mx-auto w-full max-w-2xl flex-1 px-6 py-10">
      <div className="h-7 w-2/3 animate-pulse rounded bg-zinc-200 dark:bg-zinc-800" />
      <div className="mt-2 h-4 w-1/3 animate-pulse rounded bg-zinc-100 dark:bg-zinc-900" />
      <div className="mt-6 h-24 w-full animate-pulse rounded bg-zinc-100 dark:bg-zinc-900" />
      <div className="mt-8 h-32 w-full animate-pulse rounded-lg border border-zinc-200 bg-zinc-100 dark:border-zinc-800 dark:bg-zinc-900" />
    </div>
  );
}
