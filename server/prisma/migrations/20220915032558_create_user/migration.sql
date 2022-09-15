/*
  Warnings:

  - A unique constraint covering the columns `[slug]` on the table `Contest` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `uid` VARCHAR(191) NOT NULL,
    `role` ENUM('TEMPORARY', 'USER', 'ADMIN') NOT NULL DEFAULT 'USER',
    `userName` VARCHAR(191) NULL,
    `email` VARCHAR(191) NOT NULL,
    `atcoderId` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `User_uid_key`(`uid`),
    UNIQUE INDEX `User_userName_key`(`userName`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `Contest_slug_key` ON `Contest`(`slug`);
