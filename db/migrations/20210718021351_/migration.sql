/*
  Warnings:

  - You are about to drop the column `playerIds` on the `Game` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[order,gameId]` on the table `Player` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Game" DROP COLUMN "playerIds";

-- AlterTable
ALTER TABLE "Player" ADD COLUMN     "order" INTEGER NOT NULL DEFAULT 0;

-- CreateIndex
CREATE UNIQUE INDEX "Player.order_gameId_unique" ON "Player"("order", "gameId");
