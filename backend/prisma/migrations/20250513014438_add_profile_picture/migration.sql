/*
  Warnings:

  - Added the required column `profilePicture` to the `Pet` table without a default value. This is not possible if the table is not empty.
  - Added the required column `profilePicture` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Pet" ADD COLUMN     "profilePicture" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "profilePicture" TEXT NOT NULL;
