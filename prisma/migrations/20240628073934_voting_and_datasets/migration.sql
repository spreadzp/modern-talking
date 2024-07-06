/*
  Warnings:

  - A unique constraint covering the columns `[votingId]` on the table `chats` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[datasetId]` on the table `chats` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[votingId]` on the table `rewards` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[datasetId]` on the table `rewards` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[creatorVotingId]` on the table `users` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[creatorDatasetId]` on the table `users` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "chats" ADD COLUMN     "datasetId" INTEGER,
ADD COLUMN     "votingId" INTEGER;

-- AlterTable
ALTER TABLE "rewards" ADD COLUMN     "datasetId" INTEGER,
ADD COLUMN     "votingId" INTEGER;

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "creatorDatasetId" INTEGER,
ADD COLUMN     "creatorVotingId" INTEGER;

-- CreateTable
CREATE TABLE "voting_list" (
    "id" SERIAL NOT NULL,
    "hash" TEXT NOT NULL,
    "sourceUrl" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "prompt" TEXT NOT NULL,
    "topic" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "voting_list_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "datasets" (
    "id" SERIAL NOT NULL,
    "hash" TEXT NOT NULL,
    "sourceUrl" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "prompt" TEXT NOT NULL,
    "topic" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "datasets_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "voting_list_hash_key" ON "voting_list"("hash");

-- CreateIndex
CREATE UNIQUE INDEX "voting_list_sourceUrl_key" ON "voting_list"("sourceUrl");

-- CreateIndex
CREATE UNIQUE INDEX "datasets_hash_key" ON "datasets"("hash");

-- CreateIndex
CREATE UNIQUE INDEX "datasets_sourceUrl_key" ON "datasets"("sourceUrl");

-- CreateIndex
CREATE UNIQUE INDEX "chats_votingId_key" ON "chats"("votingId");

-- CreateIndex
CREATE UNIQUE INDEX "chats_datasetId_key" ON "chats"("datasetId");

-- CreateIndex
CREATE UNIQUE INDEX "rewards_votingId_key" ON "rewards"("votingId");

-- CreateIndex
CREATE UNIQUE INDEX "rewards_datasetId_key" ON "rewards"("datasetId");

-- CreateIndex
CREATE UNIQUE INDEX "users_creatorVotingId_key" ON "users"("creatorVotingId");

-- CreateIndex
CREATE UNIQUE INDEX "users_creatorDatasetId_key" ON "users"("creatorDatasetId");

-- AddForeignKey
ALTER TABLE "rewards" ADD CONSTRAINT "rewards_votingId_fkey" FOREIGN KEY ("votingId") REFERENCES "voting_list"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rewards" ADD CONSTRAINT "rewards_datasetId_fkey" FOREIGN KEY ("datasetId") REFERENCES "datasets"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "chats" ADD CONSTRAINT "chats_votingId_fkey" FOREIGN KEY ("votingId") REFERENCES "voting_list"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "chats" ADD CONSTRAINT "chats_datasetId_fkey" FOREIGN KEY ("datasetId") REFERENCES "datasets"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_creatorVotingId_fkey" FOREIGN KEY ("creatorVotingId") REFERENCES "voting_list"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_creatorDatasetId_fkey" FOREIGN KEY ("creatorDatasetId") REFERENCES "datasets"("id") ON DELETE SET NULL ON UPDATE CASCADE;
