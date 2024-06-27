-- CreateTable
CREATE TABLE "surveys" (
    "id" SERIAL NOT NULL,
    "hash" TEXT NOT NULL,
    "sourceUrl" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "prompt" TEXT NOT NULL,
    "topic" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "surveys_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "surveys_hash_key" ON "surveys"("hash");

-- CreateIndex
CREATE UNIQUE INDEX "surveys_sourceUrl_key" ON "surveys"("sourceUrl");

-- AlterTable
ALTER TABLE "chats" ADD COLUMN "surveyId" INTEGER;
UPDATE "chats" SET "surveyId" = (SELECT id FROM "surveys" LIMIT 1) WHERE "surveyId" IS NULL;
ALTER TABLE "chats" ALTER COLUMN "surveyId" SET NOT NULL;

-- AlterTable
ALTER TABLE "rewards" ADD COLUMN "surveyId" INTEGER;
UPDATE "rewards" SET "surveyId" = (SELECT id FROM "surveys" LIMIT 1) WHERE "surveyId" IS NULL;
ALTER TABLE "rewards" ALTER COLUMN "surveyId" SET NOT NULL;

-- AlterTable
ALTER TABLE "users" ADD COLUMN "creatorSurveyId" INTEGER;

-- CreateIndex
CREATE UNIQUE INDEX "chats_surveyId_key" ON "chats"("surveyId");

-- CreateIndex
CREATE UNIQUE INDEX "rewards_surveyId_key" ON "rewards"("surveyId");

-- CreateIndex
CREATE UNIQUE INDEX "users_creatorSurveyId_key" ON "users"("creatorSurveyId");

-- AddForeignKey
ALTER TABLE "rewards" ADD CONSTRAINT "rewards_surveyId_fkey" FOREIGN KEY ("surveyId") REFERENCES "surveys"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "chats" ADD CONSTRAINT "chats_surveyId_fkey" FOREIGN KEY ("surveyId") REFERENCES "surveys"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_creatorSurveyId_fkey" FOREIGN KEY ("creatorSurveyId") REFERENCES "surveys"("id") ON DELETE SET NULL ON UPDATE CASCADE;