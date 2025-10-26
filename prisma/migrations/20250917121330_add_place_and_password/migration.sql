/*
  Warnings:

  - You are about to drop the column `uid` on the `User` table. All the data in the column will be lost.
  - Made the column `email` on table `User` required. This step will fail if there are existing NULL values in that column.
  - Made the column `name` on table `User` required. This step will fail if there are existing NULL values in that column.
  - Made the column `passwordHash` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- DropIndex
DROP INDEX "public"."User_uid_key";

-- AlterTable
ALTER TABLE "public"."User" DROP COLUMN "uid",
ADD COLUMN     "place" TEXT,
ALTER COLUMN "email" SET NOT NULL,
ALTER COLUMN "name" SET NOT NULL,
ALTER COLUMN "passwordHash" SET NOT NULL;
