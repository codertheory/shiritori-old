-- CreateEnum
CREATE TYPE "GameVariant" AS ENUM ('ENGLISH');

-- AlterTable
ALTER TABLE "Game"
  ADD COLUMN "variant" "GameVariant" NOT NULL DEFAULT E'ENGLISH';
