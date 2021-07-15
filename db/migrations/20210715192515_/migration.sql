/*
  Warnings:

  - Added the required column `resource` to the `Game` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Game" ADD COLUMN     "resource" TEXT NOT NULL;
