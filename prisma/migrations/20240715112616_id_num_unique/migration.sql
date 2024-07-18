/*
  Warnings:

  - A unique constraint covering the columns `[idNum]` on the table `Client` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Client_idNum_key" ON "Client"("idNum");
