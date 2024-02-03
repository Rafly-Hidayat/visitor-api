/*
  Warnings:

  - A unique constraint covering the columns `[username]` on the table `users` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `description` to the `visitors` table without a default value. This is not possible if the table is not empty.
  - Added the required column `purpose` to the `visitors` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "visitors" ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "purpose" VARCHAR(100) NOT NULL;

-- CreateTable
CREATE TABLE "purposeVisit" (
    "purpose" VARCHAR(100) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "purposeVisit_pkey" PRIMARY KEY ("purpose")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_username_key" ON "users"("username");

-- AddForeignKey
ALTER TABLE "visitors" ADD CONSTRAINT "visitors_purpose_fkey" FOREIGN KEY ("purpose") REFERENCES "purposeVisit"("purpose") ON DELETE RESTRICT ON UPDATE CASCADE;
