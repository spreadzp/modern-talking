-- CreateEnum
CREATE TYPE "StatusLot" AS ENUM ('Active', 'Inactive', 'Sold', 'Cancelled');

-- AlterTable
ALTER TABLE "marketplace" ADD COLUMN     "status" "StatusLot" NOT NULL DEFAULT 'Active';
