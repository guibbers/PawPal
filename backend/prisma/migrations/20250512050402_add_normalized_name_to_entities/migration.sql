/*
  Warnings:

  - Added the required column `normalizedName` to the `Pet` table without a default value. This is not possible if the table is not empty.
  - Added the required column `normalizedName` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Pet" ADD COLUMN     "normalizedName" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "normalizedName" TEXT NOT NULL;
