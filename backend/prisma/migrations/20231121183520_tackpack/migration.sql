-- DropForeignKey
ALTER TABLE "tackpack" DROP CONSTRAINT "tackpack_styleNo_fkey";

-- AlterTable
ALTER TABLE "tackpack" ALTER COLUMN "styleNo" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "tackpack" ADD CONSTRAINT "tackpack_styleNo_fkey" FOREIGN KEY ("styleNo") REFERENCES "styles"("styleNo") ON DELETE SET NULL ON UPDATE CASCADE;
