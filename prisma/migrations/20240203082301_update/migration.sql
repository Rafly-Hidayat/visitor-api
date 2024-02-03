/*
  Warnings:

  - The primary key for the `purposeVisit` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `purpose` on the `visitors` table. All the data in the column will be lost.
  - The required column `purposeId` was added to the `purposeVisit` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `purposeId` to the `visitors` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "visitors" DROP CONSTRAINT "visitors_purpose_fkey";

-- AlterTable
ALTER TABLE "purposeVisit" DROP CONSTRAINT "purposeVisit_pkey",
ADD COLUMN     "purposeId" TEXT NOT NULL,
ADD CONSTRAINT "purposeVisit_pkey" PRIMARY KEY ("purposeId");

-- AlterTable
ALTER TABLE "visitors" DROP COLUMN "purpose",
ADD COLUMN     "purposeId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "visitors" ADD CONSTRAINT "visitors_purposeId_fkey" FOREIGN KEY ("purposeId") REFERENCES "purposeVisit"("purposeId") ON DELETE RESTRICT ON UPDATE CASCADE;
