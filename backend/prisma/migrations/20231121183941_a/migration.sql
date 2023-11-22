/*
  Warnings:

  - Made the column `styleNo` on table `tackpack` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "tackpack" DROP CONSTRAINT "tackpack_styleNo_fkey";

-- AlterTable
ALTER TABLE "tackpack" ALTER COLUMN "styleNo" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "tackpack" ADD CONSTRAINT "tackpack_styleNo_fkey" FOREIGN KEY ("styleNo") REFERENCES "styles"("styleNo") ON DELETE RESTRICT ON UPDATE CASCADE;
