-- AlterTable
ALTER TABLE "Agnt" ADD COLUMN     "gglName" TEXT,
ADD COLUMN     "gglSub" TEXT,
ADD COLUMN     "picture" TEXT,
ADD COLUMN     "verified" BOOLEAN NOT NULL DEFAULT false;

-- CreateIndex
CREATE INDEX "Agnt_email_idx" ON "Agnt"("email");
