/*
  Warnings:

  - Made the column `place` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "public"."Event" ALTER COLUMN "description" SET DEFAULT '';

-- AlterTable
ALTER TABLE "public"."User" ADD COLUMN     "description" TEXT NOT NULL DEFAULT '',
ALTER COLUMN "place" SET NOT NULL,
ALTER COLUMN "place" SET DEFAULT '';
