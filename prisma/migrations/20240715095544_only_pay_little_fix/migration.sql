/*
  Warnings:

  - You are about to drop the column `payMnt` on the `Sale` table. All the data in the column will be lost.
  - You are about to drop the column `payOnce` on the `Sale` table. All the data in the column will be lost.
  - Added the required column `pay` to the `Sale` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Sale" DROP COLUMN "payMnt",
DROP COLUMN "payOnce",
ADD COLUMN     "pay" DOUBLE PRECISION NOT NULL;
