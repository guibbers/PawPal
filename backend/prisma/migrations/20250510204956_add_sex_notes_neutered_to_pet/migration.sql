/*
  Warnings:

  - Added the required column `gender` to the `Pet` table without a default value. This is not possible if the table is not empty.
  - Added the required column `neutered` to the `Pet` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Sex" AS ENUM ('MALE', 'FEMALE', 'UNKNOWN');

-- AlterTable
ALTER TABLE "Pet" ADD COLUMN     "gender" "Sex" NOT NULL,
ADD COLUMN     "neutered" BOOLEAN NOT NULL,
ADD COLUMN     "notes" TEXT;
