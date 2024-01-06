/*
  Warnings:

  - Added the required column `problemStatus` to the `problem_reports` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "IssueStatus" AS ENUM ('Solved', 'Working', 'NotPossible', 'Hold', 'AlreadyFixed');

-- AlterTable
ALTER TABLE "problem_reports" ADD COLUMN     "problemStatus" "IssueStatus" NOT NULL;
