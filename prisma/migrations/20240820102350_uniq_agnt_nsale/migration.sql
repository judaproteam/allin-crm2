/*
  Warnings:

  - A unique constraint covering the columns `[saleId,agntId]` on the table `StickySales` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "StickySales_saleId_agntId_key" ON "StickySales"("saleId", "agntId");
