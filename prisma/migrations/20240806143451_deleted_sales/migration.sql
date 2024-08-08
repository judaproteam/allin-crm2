-- CreateTable
CREATE TABLE "DeletedSale" (
    "id" SERIAL NOT NULL,
    "agntId" INTEGER NOT NULL,
    "agnt2Id" INTEGER,
    "agntName" TEXT,
    "agnt2Name" TEXT,
    "agntShare" INTEGER NOT NULL DEFAULT 100,
    "agnt2Share" INTEGER DEFAULT 0,
    "offrDt" TIMESTAMP(3) NOT NULL,
    "company" TEXT NOT NULL,
    "branch" TEXT NOT NULL,
    "prdct" TEXT NOT NULL,
    "prdctType" TEXT NOT NULL,
    "pay" DOUBLE PRECISION NOT NULL,
    "status" TEXT NOT NULL,
    "saleDt" TIMESTAMP(3),
    "action" TEXT DEFAULT 'מכירה',
    "clientId" INTEGER NOT NULL,
    "clientDetails" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "saleCreatedAt" TIMESTAMP(3) NOT NULL,
    "deletedById" INTEGER NOT NULL,

    CONSTRAINT "DeletedSale_pkey" PRIMARY KEY ("id")
);
