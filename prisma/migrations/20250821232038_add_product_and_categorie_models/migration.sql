-- CreateTable
CREATE TABLE "public"."Product" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "stock" INTEGER NOT NULL,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Categorie" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "productId" INTEGER NOT NULL,

    CONSTRAINT "Categorie_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Categorie_name_key" ON "public"."Categorie"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Categorie_productId_key" ON "public"."Categorie"("productId");

-- AddForeignKey
ALTER TABLE "public"."Categorie" ADD CONSTRAINT "Categorie_productId_fkey" FOREIGN KEY ("productId") REFERENCES "public"."Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
