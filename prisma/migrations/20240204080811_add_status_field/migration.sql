-- CreateEnum
CREATE TYPE "Status" AS ENUM ('INSIDE', 'OUTSIDE');

-- AlterTable
ALTER TABLE "visitors" ADD COLUMN     "status" "Status" DEFAULT 'INSIDE';
