/*
  Warnings:

  - The values [ENGLISH] on the enum `GameVariant` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "GameVariant_new" AS ENUM ('Default', 'Nouns');
ALTER TABLE "Game"
  ALTER COLUMN "variant" DROP DEFAULT;
ALTER TABLE "Game"
  ALTER COLUMN "variant" TYPE "GameVariant_new" USING ("variant"::text::"GameVariant_new");
ALTER TYPE "GameVariant" RENAME TO "GameVariant_old";
ALTER TYPE "GameVariant_new" RENAME TO "GameVariant";
DROP TYPE "GameVariant_old";
ALTER TABLE "Game"
  ALTER COLUMN "variant" SET DEFAULT 'Default';
COMMIT;

-- AlterTable
ALTER TABLE "Game"
  ALTER COLUMN "variant" SET DEFAULT E'Default';
