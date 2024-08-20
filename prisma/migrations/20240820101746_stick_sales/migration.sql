-- CreateTable
CREATE TABLE "StickySales" (
    "id" SERIAL NOT NULL,
    "saleId" INTEGER NOT NULL,
    "agntId" INTEGER NOT NULL,

    CONSTRAINT "StickySales_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "StickySales" ADD CONSTRAINT "StickySales_saleId_fkey" FOREIGN KEY ("saleId") REFERENCES "Sale"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StickySales" ADD CONSTRAINT "StickySales_agntId_fkey" FOREIGN KEY ("agntId") REFERENCES "Agnt"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
