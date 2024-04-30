-- CreateTable
CREATE TABLE "Post" (
    "id" TEXT NOT NULL,
    "originalId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "tags" TEXT[],
    "author" TEXT NOT NULL,
    "originalAuthor" TEXT NOT NULL,
    "isRepost" BOOLEAN NOT NULL,

    CONSTRAINT "Post_pkey" PRIMARY KEY ("id")
);
