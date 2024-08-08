/*
  Warnings:

  - You are about to drop the column `agntsGroupId` on the `Agnt` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Agnt" DROP CONSTRAINT "Agnt_agntsGroupId_fkey";

-- AlterTable
ALTER TABLE "Agnt" DROP COLUMN "agntsGroupId",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "AgntsGroup" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "Client" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "Promo" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- CreateTable
CREATE TABLE "_AgntToAgntsGroup" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_AgntToAgntsGroup_AB_unique" ON "_AgntToAgntsGroup"("A", "B");

-- CreateIndex
CREATE INDEX "_AgntToAgntsGroup_B_index" ON "_AgntToAgntsGroup"("B");

-- AddForeignKey
ALTER TABLE "_AgntToAgntsGroup" ADD CONSTRAINT "_AgntToAgntsGroup_A_fkey" FOREIGN KEY ("A") REFERENCES "Agnt"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AgntToAgntsGroup" ADD CONSTRAINT "_AgntToAgntsGroup_B_fkey" FOREIGN KEY ("B") REFERENCES "AgntsGroup"("id") ON DELETE CASCADE ON UPDATE CASCADE;
