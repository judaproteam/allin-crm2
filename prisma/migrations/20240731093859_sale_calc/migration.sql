-- CreateTable
CREATE TABLE "SaleCalc" (
    "id" SERIAL NOT NULL,
    "onePrecent" INTEGER,
    "fifteenPrecent" INTEGER,
    "yearly" INTEGER,
    "total" INTEGER,
    "agntTotal" INTEGER,
    "agnt2Total" INTEGER,
    "saleId" INTEGER NOT NULL,

    CONSTRAINT "SaleCalc_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "SaleCalc" ADD CONSTRAINT "SaleCalc_saleId_fkey" FOREIGN KEY ("saleId") REFERENCES "Sale"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
