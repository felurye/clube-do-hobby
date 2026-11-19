import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

function datasourceUrl() {
  const url = new URL(process.env.CH_STORAGE_DATABASE_URL_POOLED!);
  // O endpoint "pooled" ja e um pooler externo com limite proprio (9 conexoes
  // no plano atual). Sem isso, o client calcula seu pool a partir do numero
  // de CPUs e estoura esse limite sozinho.
  if (!url.searchParams.has("connection_limit")) {
    url.searchParams.set("connection_limit", "3");
  }
  return url.toString();
}

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    datasourceUrl: datasourceUrl(),
    log: process.env.NODE_ENV === "development" ? ["warn", "error"] : ["error"],
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
