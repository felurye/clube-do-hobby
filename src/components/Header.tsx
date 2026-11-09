import Link from "next/link";
import { auth, signOut } from "@/auth";
import Logo from "@/components/Logo";
import ThemeToggle from "@/components/ThemeToggle";
import MobileMenu from "@/components/MobileMenu";
import NavLink, { type NavItem } from "@/components/NavLink";

const roleLabel: Record<string, string> = {
  ADMIN: "admin",
  MODERATOR: "moderador",
  MEMBER: "membro",
};

const navLink =
  "rounded-full px-3 py-2 font-medium text-zinc-700 transition-colors hover:bg-zinc-900/5 hover:text-ink dark:text-zinc-300 dark:hover:bg-white/10 dark:hover:text-paper";
const navLinkActive = "bg-zinc-900/5 text-ink dark:bg-white/10 dark:text-paper";

const primaryButton =
  "rounded-full bg-ink font-medium text-paper transition-colors hover:bg-zinc-800 dark:bg-paper dark:text-ink dark:hover:bg-zinc-200";
const outlineButton =
  "rounded-full border-2 border-ink font-medium text-ink transition-colors hover:bg-ink hover:text-paper dark:border-paper dark:text-paper dark:hover:bg-paper dark:hover:text-ink";

export default async function Header() {
  const session = await auth();
  const user = session?.user;

  const links: NavItem[] = [];
  if (user) {
    links.push({ href: "/indicacoes", label: "Indicações" });
    if (user.role === "MODERATOR" || user.role === "ADMIN") {
      links.push(
        { href: "/moderacao/denuncias", label: "Denúncias" },
        { href: "/moderacao/categorias", label: "Categorias" },
      );
    }
    if (user.role === "ADMIN") links.push({ href: "/admin/destaques", label: "Admin" });
  }

  const roleBadge = user && (
    <span className="rounded-full bg-petal-100 px-2 py-0.5 text-xs font-medium text-petal-800 dark:bg-petal-900 dark:text-petal-100">
      {roleLabel[user.role] ?? user.role}
    </span>
  );

  const signOutForm = (className: string) => (
    <form
      action={async () => {
        "use server";
        await signOut({ redirectTo: "/" });
      }}
    >
      <button type="submit" className={className}>
        Sair
      </button>
    </form>
  );

  // Conteúdo do rodapé do menu móvel
  const mobileFooter = user ? (
    <div className="flex items-center justify-between gap-3 px-4">
      <span className="flex min-w-0 items-center gap-2 text-zinc-700 dark:text-zinc-300">
        <span className="truncate">{user.name}</span>
        {roleBadge}
      </span>
      {signOutForm(`${outlineButton} px-5 py-2.5 text-sm`)}
    </div>
  ) : (
    <div className="grid grid-cols-2 gap-3">
      <Link href="/login" className={`${outlineButton} py-3 text-center text-sm`}>
        Entrar
      </Link>
      <Link href="/register" className={`${primaryButton} py-3 text-center text-sm`}>
        Criar conta
      </Link>
    </div>
  );

  return (
    <header className="sticky top-0 z-20 flex items-center justify-between gap-x-6 border-b-2 border-ink bg-background/95 px-4 py-2.5 backdrop-blur sm:px-6 dark:border-zinc-700">
      <Link
        href="/"
        aria-label="Clube do Hobby - página inicial"
        className="shrink-0 text-xl sm:text-2xl"
      >
        <Logo />
      </Link>

      {/* Desktop */}
      <nav aria-label="Menu principal" className="hidden items-center gap-1 text-sm lg:flex">
        {links.map((link) => (
          <NavLink key={link.href} {...link} className={navLink} activeClassName={navLinkActive} />
        ))}
        {user ? (
          <>
            <span className="flex items-center gap-2 px-3 text-zinc-700 dark:text-zinc-300">
              {user.name}
              {roleBadge}
            </span>
            {signOutForm(navLink)}
          </>
        ) : (
          <>
            <Link href="/login" className={navLink}>
              Entrar
            </Link>
            <Link href="/register" className={`${primaryButton} ml-1 px-4 py-2`}>
              Criar conta
            </Link>
          </>
        )}
        <ThemeToggle />
      </nav>

      {/* Celular e tablet */}
      <div className="flex items-center gap-1 lg:hidden">
        <ThemeToggle />
        <MobileMenu links={links} footer={mobileFooter} />
      </div>
    </header>
  );
}
