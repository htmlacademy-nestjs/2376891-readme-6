/*
  Warnings:

  - You are about to drop the column `originalId` on the `posts` table. All the data in the column will be lost.
  - Added the required column `original_id` to the `posts` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "posts" DROP COLUMN "originalId",
ADD COLUMN     "original_id" TEXT NOT NULL;
