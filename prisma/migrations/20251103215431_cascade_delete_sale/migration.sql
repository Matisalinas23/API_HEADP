/*
  Warnings:

  - You are about to drop the `Receipt` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ReceiptItem` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Sale` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."Receipt" DROP CONSTRAINT "Receipt_addressId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Receipt" DROP CONSTRAINT "Receipt_userId_fkey";

-- DropForeignKey
ALTER TABLE "public"."ReceiptItem" DROP CONSTRAINT "ReceiptItem_productId_fkey";

-- DropForeignKey
ALTER TABLE "public"."ReceiptItem" DROP CONSTRAINT "ReceiptItem_receiptId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Sale" DROP CONSTRAINT "Sale_productId_fkey";

-- DropTable
DROP TABLE "public"."Receipt";

-- DropTable
DROP TABLE "public"."ReceiptItem";

-- DropTable
DROP TABLE "public"."Sale";
