-- CreateEnum
CREATE TYPE "IssueLists" AS ENUM ('troubleLoggingIn', 'forgotEmail', 'forgotPassword', 'loadingIssues', 'accountDeactivation', 'securityConcerns', 'technicalGlitches', 'featureRequest', 'paymentIssue', 'uiFeedback', 'accountRecovery', 'other');

-- CreateTable
CREATE TABLE "problem_reports" (
    "problemReportsId" TEXT NOT NULL,
    "issueName" "IssueLists" NOT NULL,
    "emailAddress" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "createdAt" TIMESTAMPTZ(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(0) NOT NULL,

    CONSTRAINT "problem_reports_pkey" PRIMARY KEY ("problemReportsId")
);
