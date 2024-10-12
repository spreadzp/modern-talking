-- CreateEnum
CREATE TYPE "ListingStatus" AS ENUM ('Unlisted', 'Listed', 'Withdrawn');

-- AlterTable
ALTER TABLE "datasets" ADD COLUMN     "listingStatus" "ListingStatus" NOT NULL DEFAULT 'Unlisted';

-- AlterTable
ALTER TABLE "discussions" ADD COLUMN     "listingStatus" "ListingStatus" NOT NULL DEFAULT 'Unlisted';

-- AlterTable
ALTER TABLE "surveys" ADD COLUMN     "listingStatus" "ListingStatus" NOT NULL DEFAULT 'Unlisted';

-- AlterTable
ALTER TABLE "voting_list" ADD COLUMN     "listingStatus" "ListingStatus" NOT NULL DEFAULT 'Unlisted';
