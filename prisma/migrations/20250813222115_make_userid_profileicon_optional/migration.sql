-- DropForeignKey
ALTER TABLE "public"."ProfileIcon" DROP CONSTRAINT "ProfileIcon_userId_fkey";

-- AlterTable
ALTER TABLE "public"."ProfileIcon" ALTER COLUMN "userId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "public"."ProfileIcon" ADD CONSTRAINT "ProfileIcon_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
