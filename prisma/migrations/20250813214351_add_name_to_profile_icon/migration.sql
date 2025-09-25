/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `ProfileIcon` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `name` to the `ProfileIcon` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."ProfileIcon" ADD COLUMN     "name" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "ProfileIcon_name_key" ON "public"."ProfileIcon"("name");
