/*
  Warnings:

  - You are about to drop the `Post` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Post";

-- CreateTable
CREATE TABLE "posts" (
    "id" TEXT NOT NULL,
    "originalId" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "tags" TEXT[],
    "author_id" TEXT NOT NULL,
    "original_author_id" TEXT NOT NULL,
    "is_repost" BOOLEAN NOT NULL,

    CONSTRAINT "posts_pkey" PRIMARY KEY ("id")
);
