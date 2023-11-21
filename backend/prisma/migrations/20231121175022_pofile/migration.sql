/*
  Warnings:

  - You are about to drop the column `poFile` on the `orders` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "orders" DROP COLUMN "poFile",
ADD COLUMN     "orderFile" TEXT;
