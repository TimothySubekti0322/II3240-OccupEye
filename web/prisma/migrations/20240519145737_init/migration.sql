-- CreateTable
CREATE TABLE "User" (
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("email")
);

-- CreateTable
CREATE TABLE "Device" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,

    CONSTRAINT "Device_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Data" (
    "id" TEXT NOT NULL,
    "deviceId" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "hour" INTEGER NOT NULL,
    "visitors" INTEGER NOT NULL,
    "entered" INTEGER NOT NULL,
    "exited" INTEGER NOT NULL,

    CONSTRAINT "Data_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Device" ADD CONSTRAINT "Device_email_fkey" FOREIGN KEY ("email") REFERENCES "User"("email") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Data" ADD CONSTRAINT "Data_deviceId_fkey" FOREIGN KEY ("deviceId") REFERENCES "Device"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
