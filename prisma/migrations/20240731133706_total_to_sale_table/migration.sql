/*
  Warnings:

  - You are about to drop the `SaleCalc` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "SaleCalc" DROP CONSTRAINT "SaleCalc_saleId_fkey";

-- AlterTable
ALTER TABLE "Sale" ADD COLUMN     "agnt2Total" DOUBLE PRECISION DEFAULT 0,
ADD COLUMN     "agntTotal" DOUBLE PRECISION DEFAULT 0,
ADD COLUMN     "total" DOUBLE PRECISION DEFAULT 0;

-- DropTable
DROP TABLE "SaleCalc";
