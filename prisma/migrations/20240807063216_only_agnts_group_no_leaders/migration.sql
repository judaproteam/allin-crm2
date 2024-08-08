/*
  Warnings:

  - You are about to drop the column `leaderId` on the `AgntsGroup` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "AgntsGroup" DROP CONSTRAINT "AgntsGroup_leaderId_fkey";

-- DropIndex
DROP INDEX "AgntsGroup_leaderId_key";

-- AlterTable
ALTER TABLE "AgntsGroup" DROP COLUMN "leaderId";
