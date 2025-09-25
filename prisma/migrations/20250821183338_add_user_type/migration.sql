/*
  Warnings:

  - You are about to drop the `Admin` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "public"."UserType" AS ENUM ('CLIENT', 'ADMIN');

-- AlterTable
ALTER TABLE "public"."User" ADD COLUMN     "type" "public"."UserType" NOT NULL DEFAULT 'CLIENT';

-- DropTable
DROP TABLE "public"."Admin";
