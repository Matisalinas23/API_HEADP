-- DropForeignKey
ALTER TABLE "public"."Sale" DROP CONSTRAINT "Sale_productId_fkey";

-- AddForeignKey
ALTER TABLE "public"."Sale" ADD CONSTRAINT "Sale_productId_fkey" FOREIGN KEY ("productId") REFERENCES "public"."Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;
