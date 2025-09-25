/*
  Warnings:

  - You are about to drop the column `quantity` on the `CartItem` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "public"."PurchaseOrder_addressId_key";

-- DropIndex
DROP INDEX "public"."PurchaseOrder_userId_key";

-- AlterTable
ALTER TABLE "public"."CartItem" DROP COLUMN "quantity";

-- AlterTable
ALTER TABLE "public"."Product" ADD COLUMN     "quantity" INTEGER NOT NULL DEFAULT 1;

-- CreateTable
CREATE TABLE "public"."Receipt" (
    "id" SERIAL NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "subtotal" DOUBLE PRECISION NOT NULL,
    "total" DOUBLE PRECISION NOT NULL,
    "iva" DOUBLE PRECISION NOT NULL,
    "userId" INTEGER NOT NULL,
    "addressId" INTEGER NOT NULL,

    CONSTRAINT "Receipt_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."ReceiptItem" (
    "id" SERIAL NOT NULL,
    "receiptId" INTEGER NOT NULL,
    "productId" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "ReceiptItem_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."Receipt" ADD CONSTRAINT "Receipt_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Receipt" ADD CONSTRAINT "Receipt_addressId_fkey" FOREIGN KEY ("addressId") REFERENCES "public"."Address"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."ReceiptItem" ADD CONSTRAINT "ReceiptItem_receiptId_fkey" FOREIGN KEY ("receiptId") REFERENCES "public"."Receipt"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."ReceiptItem" ADD CONSTRAINT "ReceiptItem_productId_fkey" FOREIGN KEY ("productId") REFERENCES "public"."Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
