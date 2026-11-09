export default function Loading() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 py-16">
      <div className="h-8 w-48 animate-pulse rounded bg-zinc-200 dark:bg-zinc-800" />
      <div className="h-4 w-72 animate-pulse rounded bg-zinc-100 dark:bg-zinc-900" />
    </div>
  );
}
