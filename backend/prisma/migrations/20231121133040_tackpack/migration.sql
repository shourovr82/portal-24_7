/*
  Warnings:

  - The primary key for the `tackpack` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `tackpackId` on the `tackpack` table. All the data in the column will be lost.
  - The required column `tackPackId` was added to the `tackpack` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- AlterTable
ALTER TABLE "tackpack" DROP CONSTRAINT "tackpack_pkey",
DROP COLUMN "tackpackId",
ADD COLUMN     "tackPackId" TEXT NOT NULL,
ADD CONSTRAINT "tackpack_pkey" PRIMARY KEY ("tackPackId");
