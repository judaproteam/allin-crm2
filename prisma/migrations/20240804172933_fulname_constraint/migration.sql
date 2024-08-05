/*
  Warnings:

  - A unique constraint covering the columns `[firstName,lastName]` on the table `Agnt` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateTable
CREATE TABLE "Promo" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "desc" TEXT NOT NULL,
    "target" INTEGER NOT NULL,
    "branch" TEXT NOT NULL,

    CONSTRAINT "Promo_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Agnt_firstName_lastName_key" ON "Agnt"("firstName", "lastName");
