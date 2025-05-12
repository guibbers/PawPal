/*
  Warnings:

  - You are about to drop the column `gender` on the `Pet` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Pet" DROP COLUMN "gender",
ADD COLUMN     "sex" "Sex" NOT NULL DEFAULT 'UNKNOWN';
