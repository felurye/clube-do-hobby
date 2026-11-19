import Link from "next/link";
import { prisma } from "@/lib/prisma";
import InstagramEmbed from "@/components/InstagramEmbed";
import Logo, { Flower } from "@/components/Logo";
import Carousel from "@/components/Carousel";

const eyebrow =
  "text-sm font-semibold uppercase tracking-[0.08em] text-roma-700 dark:text-roma-300";

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
  ]).catch((error) => {
    console.error("Falha ao carregar destaques do Instagram:", error);
    return [[], []] as const;
  });

  const hasHighlights = posts.length > 0 || events.length > 0;

  return (
    <div className="flex flex-1 flex-col">
      <h1 className="sr-only">Clube do Hobby</h1>

      {/* HERO */}
      <section
        id="topo"
        className="mx-auto flex w-full max-w-6xl flex-wrap items-center gap-14 px-6 py-12 sm:py-20"
      >
        <div className="flex min-w-0 flex-1 basis-[28rem] flex-col gap-7">
          <p className={eyebrow}>Comunidade · Indicações · Encontros</p>
          <h2 className="font-display text-[clamp(2.75rem,6vw,5rem)] leading-[1.02] font-black text-foreground [font-variation-settings:'SOFT'_100,'WONK'_1]">
            Um clube para quem leva o tempo livre{" "}
            <span className="text-roma-700 dark:text-roma-300">a sério.</span>
          </h2>
          <p className="max-w-[34em] text-lg text-zinc-700 dark:text-zinc-300">
            O Clube do Hobby reúne pessoas que gostam de fazer, aprender e trocar. A
            comunidade nasceu no Instagram e no WhatsApp e agora ganha uma casa própria,
            com indicações de profissionais, lugares e empresas avaliadas pelos próprios
            membros.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/register"
              className="inline-flex min-h-[52px] items-center rounded-full bg-roma-400 px-7 py-3.5 font-semibold text-ink shadow-stamp transition-transform hover:-translate-y-0.5"
            >
              Quero fazer parte
            </Link>
            <a
              href="https://www.instagram.com/clubedohobby"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-[52px] items-center gap-2.5 rounded-full border-2 border-ink px-6 py-3 font-semibold text-ink transition-colors hover:bg-ink hover:text-paper dark:border-paper dark:text-paper dark:hover:bg-paper dark:hover:text-ink"
            >
              <InstagramIcon />
              @clubedohobby
            </a>
          </div>
        </div>

        <div className="flex min-w-0 flex-1 basis-[26rem] justify-center">
          <Logo variant="stacked" className="text-6xl" />
        </div>
      </section>

      {/* FAIXA: no celular, frases somem da direita pra nunca quebrar linha, com espaçamento equidistante */}
      <div className="mt-8 bg-oliveira text-paper sm:mt-0 dark:bg-zinc-900">
        <div className="mx-auto flex w-full max-w-6xl flex-nowrap items-center justify-between gap-x-4 overflow-hidden px-6 py-4 text-base font-semibold whitespace-nowrap uppercase tracking-[0.08em] sm:gap-x-8 sm:text-lg sm:tracking-[0.1em]">
          <span>Fazer junto</span>
          <span className="hidden text-abacate min-[560px]:inline" aria-hidden="true">✿</span>
          <span className="hidden min-[560px]:inline">Indicar com confiança</span>
          <span className="hidden text-abacate min-[880px]:inline" aria-hidden="true">✿</span>
          <span className="hidden min-[880px]:inline">Trocar experiências</span>
          <span className="hidden text-abacate min-[1140px]:inline" aria-hidden="true">✿</span>
          <span className="hidden min-[1140px]:inline">Conhecer gente</span>
        </div>
      </div>

      {/* SOBRE */}
      <section id="sobre" className="mx-auto flex w-full max-w-6xl flex-wrap gap-14 px-6 py-24 sm:py-28">
        <div className="min-w-0 flex-1 basis-[22rem]">
          <p className={`${eyebrow} mb-3`}>Sobre o clube</p>
          <h2 className="font-display text-[clamp(2.25rem,4vw,3.375rem)] font-extrabold leading-[1.08] text-foreground">
            Hobby é melhor quando tem com quem dividir.
          </h2>
        </div>
        <div className="min-w-0 flex-[1.3_1_26rem] flex flex-col gap-5 text-lg text-zinc-700 dark:text-zinc-300">
          <p>
            O Clube do Hobby é uma comunidade organizada pelo Instagram{" "}
            <a
              href="https://www.instagram.com/clubedohobby"
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold text-ink dark:text-paper"
            >
              @clubedohobby
            </a>{" "}
            e por um grupo de WhatsApp. Aqui, membros trocam dicas, combinam encontros e
            indicam uns aos outros quem faz um bom trabalho.
          </p>
          <p>
            [CONTE A HISTÓRIA DO CLUBE: quando começou, quem organiza, em qual cidade
            acontece e que tipos de hobby reúne.]
          </p>
          <div className="mt-2 flex flex-wrap gap-3">
            <span className="rounded-full bg-surface px-4 py-2 text-sm font-medium dark:bg-zinc-900">
              [Nº] membros
            </span>
            <span className="rounded-full bg-surface px-4 py-2 text-sm font-medium dark:bg-zinc-900">
              Desde [ANO]
            </span>
            <span className="rounded-full bg-surface px-4 py-2 text-sm font-medium dark:bg-zinc-900">
              [CIDADE]
            </span>
          </div>
        </div>
      </section>

      {/* O QUE TEM NO CLUBE */}
      <section id="o-que-tem" className="bg-surface dark:bg-zinc-900">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-12 px-6 py-24 sm:py-28">
          <div className="max-w-2xl">
            <p className={`${eyebrow} mb-3`}>O que tem no clube</p>
            <h2 className="font-display text-[clamp(2.25rem,4vw,3.375rem)] font-extrabold leading-[1.08] text-foreground">
              Uma casa para a comunidade, que cresce aos poucos.
            </h2>
          </div>

          <Carousel itemClassName="min-w-[240px]">
            {[
              <Link
                key="indicacoes"
                href="/indicacoes"
                className="flex min-h-[280px] flex-col gap-3.5 rounded-[28px] bg-roma-400 p-8 text-ink transition hover:-translate-y-0.5 hover:shadow-stamp"
              >
                <span className="self-start rounded-full bg-ink px-3 py-1 text-sm font-semibold uppercase tracking-[0.08em] text-paper">
                  Disponível
                </span>
                <h3 className="font-display text-[2rem] font-extrabold leading-[1.1]">Indicações</h3>
                <p>Profissionais, empresas e lugares indicados e avaliados por quem é do clube.</p>
              </Link>,
              <FeatureCard key="eventos" title="Eventos" titleClassName="text-oliveira dark:text-abacate">
                Encontros do clube com inscrição direto pelo site.
              </FeatureCard>,
              <FeatureCard key="vendas" title="Vendas" titleClassName="text-cacau dark:text-bombom">
                Um espaço para membros oferecerem o que produzem.
              </FeatureCard>,
              <FeatureCard
                key="livro"
                title="Clube do Livro"
                titleClassName="text-roma-700 dark:text-roma-300"
              >
                Leituras em grupo e conversas sobre cada livro.
              </FeatureCard>,
            ]}
          </Carousel>
        </div>
      </section>

      {/* INDICAÇÕES */}
      <section
        id="indicacoes"
        className="mx-auto flex w-full max-w-6xl flex-wrap items-center gap-14 px-6 py-24 sm:py-28"
      >
        <div className="min-w-0 flex-1 basis-[25rem] flex flex-col gap-6">
          <p className={eyebrow}>Como funcionam as indicações</p>
          <h2 className="font-display text-[clamp(2.25rem,4vw,3.375rem)] font-extrabold leading-[1.08] text-foreground">
            Aquela indicação boa do grupo, agora fácil de achar.
          </h2>
          <ol className="flex list-none flex-col gap-5 p-0">
            <Step number={1} bg="bg-abacate" title="Indique">
              Cadastre o profissional, a empresa ou o lugar, com categoria, bairro, telefone e
              Instagram.
            </Step>
            <Step number={2} bg="bg-bombom" title="Avalie">
              Dê de 1 a 5 estrelas e diga se recomenda ou não. Comente sua experiência.
            </Step>
            <Step number={3} bg="bg-cacau" textColor="text-paper" title="Encontre">
              Busque por categoria, bairro, cidade ou qualquer palavra da descrição e dos
              comentários.
            </Step>
          </ol>
        </div>

        <div className="flex min-w-0 flex-1 basis-[25rem] justify-center">
          <div className="flex w-full max-w-[440px] flex-col gap-4 rounded-[28px] bg-surface p-7 shadow-[0_24px_48px_-24px_rgba(101,96,56,0.35)]">
            <div className="flex items-center justify-between gap-3">
              <span className="rounded-full bg-background px-3 py-1 text-sm font-semibold uppercase tracking-[0.06em] text-zinc-700 dark:text-zinc-300">
                [Categoria]
              </span>
              <span className="rounded-full bg-oliveira px-3 py-1 text-sm font-bold text-paper">
                Recomendo
              </span>
            </div>
            <h3 className="font-display text-2xl font-extrabold leading-[1.15] text-foreground">
              [Nome da indicação]
            </h3>
            <div
              className="flex items-center gap-1 text-roma-600"
              role="img"
              aria-label="Nota 5 de 5"
            >
              {Array.from({ length: 5 }, (_, i) => (
                <StarIcon key={i} />
              ))}
              <span className="ml-2 text-sm text-zinc-700 dark:text-zinc-300">[nota] · [nº] avaliações</span>
            </div>
            <p className="text-zinc-700 dark:text-zinc-300">[Bairro], [Cidade]</p>
            <div className="border-t border-line pt-4 text-sm text-zinc-700 dark:text-zinc-300">
              &ldquo;[Comentário de um membro sobre a experiência.]&rdquo;
            </div>
          </div>
        </div>
      </section>

      {/* INSTAGRAM */}
      <section id="instagram" className="bg-suspiro dark:bg-zinc-900">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-6 py-24 sm:py-28">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div className="max-w-xl">
              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.08em] text-[#6e3b33] dark:text-roma-300">
                Nas redes
              </p>
              <h2 className="font-display text-[clamp(2.25rem,4vw,3.375rem)] font-extrabold leading-[1.08] text-foreground">
                Acompanhe o clube no Instagram.
              </h2>
            </div>
            <a
              href="https://www.instagram.com/clubedohobby"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-[52px] items-center gap-2.5 rounded-full bg-ink px-6 py-3.5 font-semibold text-paper"
            >
              <InstagramIcon />
              Seguir @clubedohobby
            </a>
          </div>

          {hasHighlights ? (
            <Carousel itemClassName="min-w-[280px]">
              {[
                ...posts.map((post) => (
                  <InstagramEmbed key={post.id} url={post.url} caption={post.caption} />
                )),
                ...events.map((event) => (
                  <InstagramEmbed key={event.id} url={event.url} caption={event.caption} />
                )),
              ]}
            </Carousel>
          ) : (
            <Carousel itemClassName="min-w-[220px]">
              {[
                <PlaceholderTile key="1" bg="bg-bombom" text="text-[#4a2620]">
                  [Post do Instagram — colado pelo admin]
                </PlaceholderTile>,
                <PlaceholderTile key="2" bg="bg-abacate" text="text-[#333016]">
                  [Post do Instagram — colado pelo admin]
                </PlaceholderTile>,
                <PlaceholderTile key="3" bg="bg-cacau" text="text-paper">
                  [Evento em destaque — colado pelo admin]
                </PlaceholderTile>,
                <PlaceholderTile
                  key="4"
                  bg="bg-background dark:bg-zinc-800"
                  text="text-zinc-700 dark:text-zinc-300"
                >
                  [Post do Instagram — colado pelo admin]
                </PlaceholderTile>,
              ]}
            </Carousel>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto w-full max-w-6xl px-6 py-24 sm:py-28">
        <div className="relative flex flex-wrap items-center justify-between gap-8 overflow-hidden rounded-[40px] bg-oliveira px-8 py-10 text-paper sm:px-16 sm:py-20 dark:bg-zinc-900">
          <Flower className="pointer-events-none absolute -right-10 -top-10 h-60 w-60 text-abacate opacity-90" />
          <div className="relative flex min-w-0 flex-1 basis-[26rem] flex-col gap-3.5">
            <h2 className="font-display text-[clamp(2.125rem,4vw,3.25rem)] font-black leading-[1.06]">
              Vem pro clube.
            </h2>
            <p className="max-w-[30em] text-lg">
              Crie sua conta de graça para ver, cadastrar e avaliar indicações da comunidade.
            </p>
          </div>
          <div className="relative flex flex-wrap gap-3.5">
            <Link
              href="/register"
              className="inline-flex min-h-[52px] items-center rounded-full bg-paper px-7 py-3.5 font-semibold text-ink"
            >
              Criar conta
            </Link>
            <Link
              href="/login"
              className="inline-flex min-h-[52px] items-center rounded-full border-2 border-paper px-6 py-3 font-semibold text-paper"
            >
              Já sou membro
            </Link>
          </div>
        </div>
      </section>

      {/* RODAPÉ */}
      <footer className="border-t border-line">
        <div className="mx-auto flex w-full max-w-6xl flex-wrap items-center justify-between gap-6 px-6 py-12">
          <Logo className="text-3xl" />
          <div className="flex flex-wrap items-center gap-x-7 gap-y-3 text-base">
            <a
              href="https://www.instagram.com/clubedohobby"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center gap-2 font-bold"
            >
              <InstagramIcon />
              Instagram
            </a>
            <a href="#" className="inline-flex min-h-11 items-center gap-2 font-bold">
              <WhatsAppIcon />
              Grupo do WhatsApp [LINK]
            </a>
            <span className="text-zinc-600 dark:text-zinc-400">
              © {new Date().getFullYear()} Clube do Hobby
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({
  title,
  titleClassName,
  children,
}: {
  title: string;
  titleClassName: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-[280px] flex-col gap-3.5 rounded-[28px] bg-background p-8 dark:bg-zinc-800">
      <span className="self-start rounded-full bg-suspiro px-3 py-1 text-sm font-semibold uppercase tracking-[0.08em] text-roma-800 dark:bg-roma-900 dark:text-roma-100">
        Em breve
      </span>
      <h3 className={`font-display text-[2rem] font-extrabold leading-[1.1] ${titleClassName}`}>
        {title}
      </h3>
      <p className="text-zinc-700 dark:text-zinc-300">{children}</p>
    </div>
  );
}

function Step({
  number,
  bg,
  textColor = "text-ink",
  title,
  children,
}: {
  number: number;
  bg: string;
  textColor?: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <li className="flex items-start gap-4">
      <span
        className={`flex h-12 w-12 flex-none items-center justify-center rounded-full font-display text-xl font-black ${bg} ${textColor}`}
      >
        {number}
      </span>
      <div>
        <strong className="block text-lg">{title}</strong>
        <span className="text-zinc-700 dark:text-zinc-300">{children}</span>
      </div>
    </li>
  );
}

function PlaceholderTile({
  bg,
  text,
  className = "",
  children,
}: {
  bg: string;
  text: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={`flex aspect-[4/5] items-center justify-center rounded-[20px] p-6 text-center text-sm ${bg} ${text} ${className}`}
    >
      {children}
    </div>
  );
}

function StarIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2l3 7 7 .6-5.3 4.7 1.6 7.2L12 17.8 5.7 21.5l1.6-7.2L2 9.6 9 9z" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden="true"
    >
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.6" fill="currentColor" />
    </svg>
  );
}

function WhatsAppIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M4 20l1.4-4A8 8 0 1 1 8 18.6z" />
    </svg>
  );
}
