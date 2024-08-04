/*
  Warnings:

  - Made the column `email` on table `Agnt` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Agnt" ALTER COLUMN "email" SET NOT NULL,
ALTER COLUMN "verified" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Client" ALTER COLUMN "createdById" DROP DEFAULT;

-- AlterTable
ALTER TABLE "Sale" ALTER COLUMN "createdById" DROP DEFAULT;
