-- CreateTable
CREATE TABLE "Agnt" (
    "id" SERIAL NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT,

    CONSTRAINT "Agnt_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Client" (
    "id" SERIAL NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "idNum" TEXT NOT NULL,

    CONSTRAINT "Client_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Sale" (
    "id" SERIAL NOT NULL,
    "status" TEXT NOT NULL,
    "action" TEXT NOT NULL,
    "company" TEXT NOT NULL,
    "branch" TEXT NOT NULL,
    "prdct" TEXT NOT NULL,
    "prdctType" TEXT NOT NULL,
    "saleDt" TIMESTAMP(3) NOT NULL,
    "offrDt" TIMESTAMP(3) NOT NULL,
    "clientId" INTEGER NOT NULL,
    "agntId" INTEGER NOT NULL,
    "payMnt" DOUBLE PRECISION NOT NULL,
    "payOnce" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Sale_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Sale" ADD CONSTRAINT "Sale_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Client"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Sale" ADD CONSTRAINT "Sale_agntId_fkey" FOREIGN KEY ("agntId") REFERENCES "Agnt"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
