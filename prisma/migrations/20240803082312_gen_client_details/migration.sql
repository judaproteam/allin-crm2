-- AlterTable
ALTER TABLE "Client" 
ADD COLUMN "name" TEXT GENERATED ALWAYS AS ("firstName" || ' ' || "lastName") STORED,
ADD COLUMN "details" TEXT GENERATED ALWAYS AS ("firstName" || ' ' || "lastName" || ' (' || "idNum" || ')') STORED;

