/*
  Warnings:

  - You are about to drop the column `currentPlayerId` on the `Game` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Game" DROP CONSTRAINT "Game_currentPlayerId_fkey";

-- DropIndex
DROP INDEX "Game_currentPlayerId_unique";

-- AlterTable
ALTER TABLE "Game" DROP COLUMN "currentPlayerId";

-- AlterTable
ALTER TABLE "Player" ADD COLUMN     "active" BOOLEAN NOT NULL DEFAULT false;
