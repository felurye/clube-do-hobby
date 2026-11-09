export default function Loading() {
  return (
    <div className="mx-auto w-full max-w-2xl flex-1 px-6 py-10">
      <div className="h-7 w-56 animate-pulse rounded bg-zinc-200 dark:bg-zinc-800" />
      <div className="mt-6 flex flex-col gap-4">
        {[1, 2].map((i) => (
          <div
            key={i}
            className="h-28 animate-pulse rounded-lg border border-zinc-200 bg-zinc-100 dark:border-zinc-800 dark:bg-zinc-900"
          />
        ))}
      </div>
    </div>
  );
}
