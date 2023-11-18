/*
  Warnings:

  - You are about to alter the column `totalPack` on the `orders` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - You are about to alter the column `totalPc` on the `orders` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.

*/
-- AlterTable
ALTER TABLE "orders" ALTER COLUMN "totalPack" SET DATA TYPE INTEGER,
ALTER COLUMN "totalPc" SET DATA TYPE INTEGER;
