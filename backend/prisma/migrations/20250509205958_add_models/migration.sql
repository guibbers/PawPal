/*
  Warnings:

  - You are about to drop the column `dogId` on the `Photo` table. All the data in the column will be lost.
  - You are about to drop the `Dog` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `petId` to the `Photo` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "PetType" AS ENUM ('DOG', 'CAT', 'FERRET', 'BIRD', 'FISH', 'OTHER');

-- DropForeignKey
ALTER TABLE "Dog" DROP CONSTRAINT "Dog_tutorId_fkey";

-- DropForeignKey
ALTER TABLE "Photo" DROP CONSTRAINT "Photo_dogId_fkey";

-- AlterTable
ALTER TABLE "Photo" DROP COLUMN "dogId",
ADD COLUMN     "petId" TEXT NOT NULL;

-- DropTable
DROP TABLE "Dog";

-- CreateTable
CREATE TABLE "Pet" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "type" "PetType" NOT NULL DEFAULT 'DOG',
    "breed" TEXT,
    "age" INTEGER,
    "tutorId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Pet_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Pet" ADD CONSTRAINT "Pet_tutorId_fkey" FOREIGN KEY ("tutorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Photo" ADD CONSTRAINT "Photo_petId_fkey" FOREIGN KEY ("petId") REFERENCES "Pet"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
