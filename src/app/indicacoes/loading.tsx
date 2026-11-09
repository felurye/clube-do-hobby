export default function Loading() {
  return (
    <div className="mx-auto w-full max-w-4xl flex-1 px-6 py-10">
      <div className="h-8 w-40 animate-pulse rounded bg-zinc-200 dark:bg-zinc-800" />
      <div className="mt-6 h-10 w-full animate-pulse rounded-md bg-zinc-100 dark:bg-zinc-900" />
      <div className="mt-6 flex flex-col gap-3">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="h-20 animate-pulse rounded-lg border border-zinc-200 bg-zinc-100 dark:border-zinc-800 dark:bg-zinc-900"
          />
        ))}
      </div>
    </div>
  );
}
