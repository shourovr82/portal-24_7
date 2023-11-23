/*
  Warnings:

  - A unique constraint covering the columns `[styleNo]` on the table `tackpack` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "tackpack_styleNo_key" ON "tackpack"("styleNo");
