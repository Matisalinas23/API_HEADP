/*
  Warnings:

  - A unique constraint covering the columns `[paymentId]` on the table `Sale` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `paymentId` to the `Sale` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status` to the `Sale` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Sale" ADD COLUMN     "paymentId" TEXT NOT NULL,
ADD COLUMN     "status" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Sale_paymentId_key" ON "public"."Sale"("paymentId");
