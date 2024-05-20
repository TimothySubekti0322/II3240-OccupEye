/*
  Warnings:

  - A unique constraint covering the columns `[deviceId,date,hour]` on the table `Data` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Data_deviceId_date_hour_key" ON "Data"("deviceId", "date", "hour");
