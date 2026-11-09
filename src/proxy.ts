import { auth } from "@/auth";
import { NextResponse } from "next/server";
import { hasAtLeastRole } from "@/lib/roles";

const protectedRoutes: { prefix: string; minRole: "MEMBER" | "MODERATOR" | "ADMIN" }[] = [
  { prefix: "/admin", minRole: "ADMIN" },
  { prefix: "/moderacao", minRole: "MODERATOR" },
  { prefix: "/indicacoes", minRole: "MEMBER" },
];

export default auth((req) => {
  const { pathname } = req.nextUrl;
  const match = protectedRoutes.find((route) => pathname.startsWith(route.prefix));
  if (!match) return NextResponse.next();

  const role = req.auth?.user?.role;

  if (!req.auth) {
    const loginUrl = new URL("/login", req.nextUrl.origin);
    loginUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(loginUrl);
  }

  if (!hasAtLeastRole(role, match.minRole)) {
    return NextResponse.redirect(new URL("/", req.nextUrl.origin));
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/admin/:path*", "/moderacao/:path*", "/indicacoes", "/indicacoes/:path*"],
};
