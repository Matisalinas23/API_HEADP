-- CreateTable
CREATE TABLE "public"."ProfileIcon" (
    "id" SERIAL NOT NULL,
    "url" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "ProfileIcon_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Address" (
    "id" SERIAL NOT NULL,
    "particularAddress" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "province" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Address_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."PurchaseOrder" (
    "id" SERIAL NOT NULL,
    "orderDate" TEXT NOT NULL,
    "orderHour" TEXT NOT NULL,
    "total" DOUBLE PRECISION NOT NULL,
    "subtotal" DOUBLE PRECISION NOT NULL,
    "iva" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "addressId" INTEGER NOT NULL,

    CONSTRAINT "PurchaseOrder_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."User" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "lastname" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ProfileIcon_userId_key" ON "public"."ProfileIcon"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Address_userId_key" ON "public"."Address"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "PurchaseOrder_userId_key" ON "public"."PurchaseOrder"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "PurchaseOrder_addressId_key" ON "public"."PurchaseOrder"("addressId");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "public"."User"("email");

-- AddForeignKey
ALTER TABLE "public"."ProfileIcon" ADD CONSTRAINT "ProfileIcon_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Address" ADD CONSTRAINT "Address_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."PurchaseOrder" ADD CONSTRAINT "PurchaseOrder_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."PurchaseOrder" ADD CONSTRAINT "PurchaseOrder_addressId_fkey" FOREIGN KEY ("addressId") REFERENCES "public"."Address"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
