/*
  Warnings:

  - You are about to drop the `Categorie` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."Categorie" DROP CONSTRAINT "Categorie_productId_fkey";

-- DropTable
DROP TABLE "public"."Categorie";

-- CreateTable
CREATE TABLE "public"."Category" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."_CategoryToProduct" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_CategoryToProduct_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "Category_name_key" ON "public"."Category"("name");

-- CreateIndex
CREATE INDEX "_CategoryToProduct_B_index" ON "public"."_CategoryToProduct"("B");

-- AddForeignKey
ALTER TABLE "public"."_CategoryToProduct" ADD CONSTRAINT "_CategoryToProduct_A_fkey" FOREIGN KEY ("A") REFERENCES "public"."Category"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."_CategoryToProduct" ADD CONSTRAINT "_CategoryToProduct_B_fkey" FOREIGN KEY ("B") REFERENCES "public"."Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;
