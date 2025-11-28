/*
  Warnings:

  - You are about to drop the column `device` on the `Tokens` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Tokens" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "token" TEXT NOT NULL
);
INSERT INTO "new_Tokens" ("id", "token") SELECT "id", "token" FROM "Tokens";
DROP TABLE "Tokens";
ALTER TABLE "new_Tokens" RENAME TO "Tokens";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
