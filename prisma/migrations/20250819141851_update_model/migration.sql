/*
  Warnings:

  - Added the required column `colorCode` to the `Doctor` table without a default value. This is not possible if the table is not empty.
  - Added the required column `colorCode` to the `Patient` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Doctor" ADD COLUMN     "colorCode" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "public"."Patient" ADD COLUMN     "colorCode" TEXT NOT NULL;
