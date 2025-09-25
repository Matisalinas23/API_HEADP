/*
  Warnings:

  - Added the required column `birthday` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `dni` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."User" ADD COLUMN     "birthday" TEXT NOT NULL,
ADD COLUMN     "dni" TEXT NOT NULL;
