/*
  Warnings:

  - Added the required column `completeUrl` to the `Url` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Url" ADD COLUMN     "completeUrl" TEXT NOT NULL,
ADD COLUMN     "deletedAt" TIMESTAMP(3),
ALTER COLUMN "clicks" DROP NOT NULL;
