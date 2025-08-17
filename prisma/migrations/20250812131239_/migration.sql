/*
  Warnings:

  - Added the required column `marital_status` to the `Patient` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Patient" ADD COLUMN     "marital_status" TEXT NOT NULL;
