export default function Loading() {
  return (
    <div className="mx-auto w-full max-w-2xl flex-1 px-6 py-10">
      <div className="h-7 w-64 animate-pulse rounded bg-zinc-200 dark:bg-zinc-800" />
      <div className="mt-6 h-12 w-full animate-pulse rounded-md bg-zinc-100 dark:bg-zinc-900" />
      <div className="mt-8 h-8 w-full animate-pulse rounded bg-zinc-100 dark:bg-zinc-900" />
    </div>
  );
}
