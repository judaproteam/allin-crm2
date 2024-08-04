/*
  Warnings:

  - Made the column `agntPay` on table `Sale` required. This step will fail if there are existing NULL values in that column.

*/
-- CreateEnum
CREATE TYPE "Role" AS ENUM ('AGNT', 'OFFICE', 'MNGR', 'ADMIN');

-- AlterTable
ALTER TABLE "Agnt" ADD COLUMN     "role" "Role" NOT NULL DEFAULT 'AGNT';

-- AlterTable
ALTER TABLE "Sale" ALTER COLUMN "agnt2Share" SET DEFAULT 0,
ALTER COLUMN "agnt2Pay" SET DEFAULT 0,
ALTER COLUMN "agntPay" SET NOT NULL;
