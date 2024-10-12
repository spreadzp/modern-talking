-- CreateEnum
CREATE TYPE "RewardStatusEnum" AS ENUM ('Pending', 'Started', 'Executing', 'Finish');

-- AlterTable
ALTER TABLE "rewards" ADD COLUMN     "status" "RewardStatusEnum" NOT NULL DEFAULT 'Pending';
