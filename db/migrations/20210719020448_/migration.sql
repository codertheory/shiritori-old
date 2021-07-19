/*
  Warnings:

  - A unique constraint covering the columns `[word,gameId]` on the table `Word` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Word.word_gameId_unique" ON "Word"("word", "gameId");
