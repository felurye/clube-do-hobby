import type { Metadata } from "next";
import { cookies } from "next/headers";
import { DM_Sans, Fraunces } from "next/font/google";
import Header from "@/components/Header";
import { THEME_COOKIE, parseTheme } from "@/lib/theme";
import "./globals.css";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  axes: ["SOFT", "WONK", "opsz"],
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Clube do Hobby",
  description: "Indicações, eventos e comunidade do Clube do Hobby.",
};

export default async function RootLayout({ children }: LayoutProps<"/">) {
  // Tema escolhido pela pessoa (cookie). Sem escolha, o CSS segue o sistema.
  const theme = parseTheme((await cookies()).get(THEME_COOKIE)?.value);

  return (
    <html
      lang="pt-BR"
      className={`${fraunces.variable} ${dmSans.variable} h-full antialiased`}
      data-theme={theme}
    >
      <body className="min-h-full flex flex-col">
        <Header />
        {children}
      </body>
    </html>
  );
}
