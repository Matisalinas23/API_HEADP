-- CreateTable
CREATE TABLE "public"."Image" (
    "id" SERIAL NOT NULL,
    "url" TEXT NOT NULL,
    "productId" INTEGER NOT NULL,

    CONSTRAINT "Image_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Image_productId_key" ON "public"."Image"("productId");

-- AddForeignKey
ALTER TABLE "public"."Image" ADD CONSTRAINT "Image_productId_fkey" FOREIGN KEY ("productId") REFERENCES "public"."Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
