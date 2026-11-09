import Link from "next/link";
import { prisma } from "@/lib/prisma";
import InstagramEmbed from "@/components/InstagramEmbed";
import Logo, { Flower } from "@/components/Logo";

export default async function Home() {
  const [posts, events] = await Promise.all([
    prisma.instagramHighlight.findMany({
      where: { kind: "POST" },
      orderBy: { position: "asc" },
    }),
    prisma.instagramHighlight.findMany({
      where: { kind: "EVENT" },
      orderBy: { position: "asc" },
    }),
  ]);

  return (
    <div className="flex flex-1 flex-col">
      <section className="relative overflow-hidden border-b-2 border-ink px-6 py-16 sm:py-24 dark:border-zinc-700">
        <Flower className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 text-petal-400 opacity-25 sm:h-96 sm:w-96" />
        <Flower className="pointer-events-none absolute -bottom-10 -left-10 h-40 w-40 text-petal-400 opacity-15" />

        <div className="relative mx-auto flex max-w-4xl flex-col items-center gap-8 text-center">
          <h1 className="sr-only">Clube do Hobby</h1>
          <Logo variant="stacked" className="text-6xl sm:text-8xl" />
          <p className="max-w-2xl text-lg text-zinc-700 dark:text-zinc-300">
            Uma comunidade de quem gosta de compartilhar hobbies, indicar profissionais e
            lugares de confiança, trocar itens e viver eventos juntos.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href="/indicacoes"
              className="rounded-full bg-ink px-6 py-3 text-sm font-semibold text-paper shadow-stamp shadow-petal-400 transition-transform hover:-translate-y-0.5 dark:bg-paper dark:text-ink"
            >
              Ver indicações da comunidade
            </Link>
            <a
              href="https://www.instagram.com/clubedohobby"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border-2 border-ink px-6 py-3 text-sm font-semibold text-ink transition-colors hover:bg-ink hover:text-paper dark:border-paper dark:text-paper dark:hover:bg-paper dark:hover:text-ink"
            >
              @clubedohobby
            </a>
          </div>
        </div>
      </section>

      {posts.length > 0 && (
        <section className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-6 py-14">
          <SectionTitle>No Instagram</SectionTitle>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <InstagramEmbed key={post.id} url={post.url} caption={post.caption} />
            ))}
          </div>
        </section>
      )}

      {events.length > 0 && (
        <section className="border-t-2 border-ink bg-petal-100 dark:border-zinc-700 dark:bg-zinc-900">
          <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-6 py-14">
            <SectionTitle>Eventos em destaque</SectionTitle>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {events.map((event) => (
                <InstagramEmbed key={event.id} url={event.url} caption={event.caption} />
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="flex items-center gap-2 text-3xl text-ink dark:text-paper">
      <Flower className="h-6 w-6 text-petal-400" />
      {children}
    </h2>
  );
}
