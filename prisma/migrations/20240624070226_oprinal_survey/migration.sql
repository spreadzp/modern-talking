-- DropForeignKey
ALTER TABLE "chats" DROP CONSTRAINT "chats_discussionId_fkey";

-- DropForeignKey
ALTER TABLE "chats" DROP CONSTRAINT "chats_surveyId_fkey";

-- AlterTable
ALTER TABLE "chats" ALTER COLUMN "discussionId" DROP NOT NULL,
ALTER COLUMN "surveyId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "chats" ADD CONSTRAINT "chats_discussionId_fkey" FOREIGN KEY ("discussionId") REFERENCES "discussions"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "chats" ADD CONSTRAINT "chats_surveyId_fkey" FOREIGN KEY ("surveyId") REFERENCES "surveys"("id") ON DELETE SET NULL ON UPDATE CASCADE;
