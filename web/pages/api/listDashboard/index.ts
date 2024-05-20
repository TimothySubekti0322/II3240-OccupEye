// pages/api/getDevices.ts

import type { NextApiRequest, NextApiResponse } from "next";
import authMiddleware from "../../../utils/authMiddleware";
import convertTZ from "../../../utils/formatDate";
import prisma from "../prisma";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { user } = req as any; // We use "as any" because the custom property is not in the type definition

  if (!user.email) {
    return res.status(200).json({ message: "Unauthorized", status: 401 });
  }

  try {
    const devices = await prisma.device.findMany({
      where: {
        email: user.email,
      },
      include: {
        data: true,
      },
    });

    const currentDate = convertTZ(new Date(), "Asia/Jakarta");
    const startOfDay = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      currentDate.getDate()
    );
    const endOfDay = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      currentDate.getDate() + 1
    );
    const currentHour = currentDate.getHours();

    const devicesWithStats = await Promise.all(
      devices.map(async (device) => {
        const currentVisitors = device.data.reduce((sum, entry) => {
          if (entry.date <= currentDate) {
            return sum + entry.entered - entry.exited;
          }
          return sum;
        }, 0);

        const enteredToday = await prisma.data.aggregate({
          _sum: {
            entered: true,
          },
          where: {
            deviceId: device.id,
            date: {
              gte: startOfDay,
              lt: endOfDay,
            },
          },
        });

        const enteredThisHour = await prisma.data.aggregate({
          _sum: {
            entered: true,
          },
          where: {
            deviceId: device.id,
            date: startOfDay,
            hour: currentHour,
          },
        });

        let currentDateData = [];

        for (const deviceData of device.data) {
          const entryDate = new Date(deviceData.date);
          if (
            entryDate.getFullYear() === currentDate.getFullYear() &&
            entryDate.getMonth() === currentDate.getMonth() &&
            entryDate.getDate() === currentDate.getDate()
          ) {
            currentDateData.push(deviceData);
          }
        }

        const hourlyData = Array.from({ length: 24 }, (_, hour) => {
          const entry = currentDateData.find((e) => {
            return e.hour === hour;
          });

          return {
            value: entry ? entry.entered : 0,
            label: `${hour}:00`,
          };
        });

        return {
          ...device,
          currentVisitors,
          enteredToday: enteredToday._sum.entered || 0,
          enteredThisHour: enteredThisHour._sum.entered || 0,
          data: hourlyData,
        };
      })
    );

    return res
      .status(200)
      .json({ message: "success", data: devicesWithStats, status: 200 });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export default authMiddleware(handler);
