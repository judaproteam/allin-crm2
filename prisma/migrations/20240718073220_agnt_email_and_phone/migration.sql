/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `Agnt` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[phone]` on the table `Agnt` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Agnt" ADD COLUMN     "email" TEXT,
ADD COLUMN     "phone" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Agnt_email_key" ON "Agnt"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Agnt_phone_key" ON "Agnt"("phone");
