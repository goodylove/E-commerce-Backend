-- CreateEnum
CREATE TYPE "ProductStatus" AS ENUM ('IN_STOCK', 'OUT_OF_STOCK');

-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "status" "ProductStatus" NOT NULL DEFAULT 'IN_STOCK';
