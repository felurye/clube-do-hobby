import { prisma } from "@/lib/prisma";

export type PossibleDuplicate = { id: string; title: string };

export async function findPossibleDuplicate(
  input: { title: string; phone?: string; instagram?: string },
  excludeId?: string,
): Promise<PossibleDuplicate | null> {
  const orClauses = [
    { title: { equals: input.title, mode: "insensitive" as const } },
    input.phone ? { phone: input.phone } : undefined,
    input.instagram ? { instagram: input.instagram } : undefined,
  ].filter((clause): clause is NonNullable<typeof clause> => Boolean(clause));

  const match = await prisma.indicacao.findFirst({
    where: {
      OR: orClauses,
      ...(excludeId ? { id: { not: excludeId } } : {}),
    },
    select: { id: true, title: true },
  });

  return match;
}
