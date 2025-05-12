/*
  Warnings:

  - You are about to drop the column `petId` on the `Photo` table. All the data in the column will be lost.
  - Made the column `photoId` on table `PetPhoto` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "PetPhoto" DROP CONSTRAINT "PetPhoto_photoId_fkey";

-- DropForeignKey
ALTER TABLE "Photo" DROP CONSTRAINT "Photo_petId_fkey";

-- AlterTable
ALTER TABLE "PetPhoto" ALTER COLUMN "photoId" SET NOT NULL;

-- AlterTable
ALTER TABLE "Photo" DROP COLUMN "petId";

-- AddForeignKey
ALTER TABLE "PetPhoto" ADD CONSTRAINT "PetPhoto_photoId_fkey" FOREIGN KEY ("photoId") REFERENCES "Photo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
