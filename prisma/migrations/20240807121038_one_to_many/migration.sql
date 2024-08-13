/*
  Warnings:

  - You are about to drop the column `creatorDatasetId` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `creatorId` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `creatorSurveyId` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `creatorVotingId` on the `users` table. All the data in the column will be lost.
  - Added the required column `ownerId` to the `datasets` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ownerId` to the `discussions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ownerId` to the `surveys` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ownerId` to the `voting_list` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "users" DROP CONSTRAINT "users_creatorDatasetId_fkey";

-- DropForeignKey
ALTER TABLE "users" DROP CONSTRAINT "users_creatorId_fkey";

-- DropForeignKey
ALTER TABLE "users" DROP CONSTRAINT "users_creatorSurveyId_fkey";

-- DropForeignKey
ALTER TABLE "users" DROP CONSTRAINT "users_creatorVotingId_fkey";

-- DropIndex
DROP INDEX "users_creatorDatasetId_key";

-- DropIndex
DROP INDEX "users_creatorId_key";

-- DropIndex
DROP INDEX "users_creatorSurveyId_key";

-- DropIndex
DROP INDEX "users_creatorVotingId_key";

-- AlterTable
ALTER TABLE "datasets" ADD COLUMN     "ownerId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "discussions" ADD COLUMN     "ownerId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "surveys" ADD COLUMN     "ownerId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "users" DROP COLUMN "creatorDatasetId",
DROP COLUMN "creatorId",
DROP COLUMN "creatorSurveyId",
DROP COLUMN "creatorVotingId";

-- AlterTable
ALTER TABLE "voting_list" ADD COLUMN     "ownerId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "discussions" ADD CONSTRAINT "discussions_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "surveys" ADD CONSTRAINT "surveys_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "voting_list" ADD CONSTRAINT "voting_list_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "datasets" ADD CONSTRAINT "datasets_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
