-- AlterTable
ALTER TABLE "Agnt" ADD COLUMN     "agntsGroupId" INTEGER;

-- CreateTable
CREATE TABLE "AgntsGroup" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "leaderId" INTEGER,

    CONSTRAINT "AgntsGroup_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "AgntsGroup_leaderId_key" ON "AgntsGroup"("leaderId");

-- AddForeignKey
ALTER TABLE "AgntsGroup" ADD CONSTRAINT "AgntsGroup_leaderId_fkey" FOREIGN KEY ("leaderId") REFERENCES "Agnt"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Agnt" ADD CONSTRAINT "Agnt_agntsGroupId_fkey" FOREIGN KEY ("agntsGroupId") REFERENCES "AgntsGroup"("id") ON DELETE SET NULL ON UPDATE CASCADE;
