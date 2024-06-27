-- DropForeignKey
ALTER TABLE "rewards" DROP CONSTRAINT "rewards_discussionId_fkey";

-- DropForeignKey
ALTER TABLE "rewards" DROP CONSTRAINT "rewards_surveyId_fkey";

-- AlterTable
ALTER TABLE "rewards" ALTER COLUMN "discussionId" DROP NOT NULL,
ALTER COLUMN "surveyId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "rewards" ADD CONSTRAINT "rewards_surveyId_fkey" FOREIGN KEY ("surveyId") REFERENCES "surveys"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rewards" ADD CONSTRAINT "rewards_discussionId_fkey" FOREIGN KEY ("discussionId") REFERENCES "discussions"("id") ON DELETE SET NULL ON UPDATE CASCADE;
