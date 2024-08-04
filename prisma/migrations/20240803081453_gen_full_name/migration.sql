-- AlterTable
ALTER TABLE "Agnt" ADD COLUMN     "name" TEXT GENERATED ALWAYS AS ("firstName" || ' ' || "lastName") STORED;