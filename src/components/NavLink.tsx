"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export type NavItem = { href: string; label: string };

/** A rota atual ou uma sub-rota dela conta como ativa (ex: /indicacoes/123). */
export function isActive(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);
}

export default function NavLink({
  href,
  label,
  className,
  activeClassName,
}: NavItem & { className: string; activeClassName: string }) {
  const pathname = usePathname();
  const active = isActive(pathname, href);

  return (
    <Link
      href={href}
      aria-current={active ? "page" : undefined}
      className={`${className} ${active ? activeClassName : ""}`}
    >
      {label}
    </Link>
  );
}
