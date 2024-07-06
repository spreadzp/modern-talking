-- CreateEnum
CREATE TYPE "LotType" AS ENUM ('DataSet', 'Voting', 'Survey', 'Discussion');

-- CreateEnum
CREATE TYPE "BidStatus" AS ENUM ('Pending', 'Accepted', 'Rejected');

-- CreateTable
CREATE TABLE "marketplace" (
    "id" SERIAL NOT NULL,
    "ownerLot" INTEGER NOT NULL,
    "typeLot" "LotType" NOT NULL,
    "hashResource" TEXT NOT NULL,
    "price" BIGINT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "marketplace_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "bids" (
    "id" SERIAL NOT NULL,
    "bidOwner" INTEGER NOT NULL,
    "price" BIGINT NOT NULL,
    "status" "BidStatus" NOT NULL,
    "idLot" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "bids_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "history" (
    "id" SERIAL NOT NULL,
    "idLot" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "history_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "marketplace" ADD CONSTRAINT "marketplace_ownerLot_fkey" FOREIGN KEY ("ownerLot") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bids" ADD CONSTRAINT "bids_bidOwner_fkey" FOREIGN KEY ("bidOwner") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bids" ADD CONSTRAINT "bids_idLot_fkey" FOREIGN KEY ("idLot") REFERENCES "marketplace"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "history" ADD CONSTRAINT "history_idLot_fkey" FOREIGN KEY ("idLot") REFERENCES "marketplace"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
