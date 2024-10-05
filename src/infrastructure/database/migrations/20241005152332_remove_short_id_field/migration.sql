/*
  Warnings:

  - You are about to drop the column `shortId` on the `Url` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[id]` on the table `Url` will be added. If there are existing duplicate values, this will fail.
  - Made the column `clicks` on table `Url` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Url" DROP COLUMN "shortId",
ALTER COLUMN "clicks" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Url_id_key" ON "Url"("id");
