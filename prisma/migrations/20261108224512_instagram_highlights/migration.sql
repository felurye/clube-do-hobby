-- CreateEnum
CREATE TYPE "HighlightKind" AS ENUM ('POST', 'EVENT');

-- CreateTable
CREATE TABLE "instagram_highlights" (
    "id" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "kind" "HighlightKind" NOT NULL,
    "caption" TEXT,
    "position" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdById" TEXT NOT NULL,

    CONSTRAINT "instagram_highlights_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "instagram_highlights_kind_position_idx" ON "instagram_highlights"("kind", "position");

-- AddForeignKey
ALTER TABLE "instagram_highlights" ADD CONSTRAINT "instagram_highlights_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
