// pages/api/dashboard/[id]

import type { NextApiRequest, NextApiResponse } from "next";
import authMiddleware from "../../../../utils/authMiddleware";
import prisma from "../../prisma";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { user } = req as any; // We use "as any" because the custom property is not in the type definition

  const { id } = req.query;

  if (!user.email) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  if (!id || typeof id !== "string") {
    return res.status(400).json({ message: "Invalid device ID" });
  }

  try {
    const device = await prisma.device.findUnique({
      where: {
        id: id,
      },
      include: {
        data: true,
      },
    });

    if (!device) {
      return res.status(404).json({ message: "Device not found" });
    }

    const currentDate = new Date();
    const startOfDay = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      currentDate.getDate()
    );
    const currentHour = currentDate.getHours();
    const earliestDate = device.data.length
      ? device.data[0].date
      : new Date().toISOString();

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
        deviceId: id,
        date: {
          gte: startOfDay,
        },
      },
    });

    const enteredThisHour = await prisma.data.aggregate({
      _sum: {
        entered: true,
      },
      where: {
        deviceId: id,
        date: startOfDay,
        hour: currentHour,
      },
    });

    const enteredByHourData = await prisma.data.findMany({
      where: {
        deviceId: id,
      },
      orderBy: [{ date: "asc" }, { hour: "asc" }],
    });

    const enteredByDayData = await prisma.data.groupBy({
      by: ["date"],
      _sum: {
        entered: true,
      },
      where: {
        deviceId: id,
      },
      orderBy: {
        date: "asc",
      },
    });

    const enteredByHourFormatted: {
      value: number;
      label: string;
      date: string;
    }[] = [];

    let daySet: string[] = [];

    enteredByHourData.forEach((entry) => {
      const entryDate = new Date(entry.date);
      if (!daySet.includes(entryDate.toISOString().split("T")[0])) {
        daySet.push(entryDate.toISOString().split("T")[0]);
      }
    });

    const hourSet = new Set<string>();

    if (daySet.length > 0) {
      for (const day of daySet) {
        for (let hour = 0; hour < 24; hour++) {
          const hourLabel = `${hour}:00`;
          const key = `${day}T${hourLabel}`;
          if (!hourSet.has(key)) {
            hourSet.add(key);
            const foundEntry = enteredByHourData.find(
              (e) =>
                e.date.toISOString().split("T")[0] === day && e.hour === hour
            );
            enteredByHourFormatted.push({
              value: foundEntry ? foundEntry.entered : 0,
              label: hourLabel,
              date: day,
            });
          }
        }
      }
    }

    // Ensure every day of each month available in "Data" is represented
    let monthSet: string[] = [];
    enteredByDayData.forEach((entry) => {
      const entryDate = new Date(entry.date);
      const monthKey = `${entryDate.getFullYear()}-${entryDate.getMonth() + 1}`;
      if (!monthSet.includes(monthKey)) {
        monthSet.push(monthKey);
      }
    });

    const enteredByDayFormatted: {
      value: number;
      label: string;
      date: string;
    }[] = [];

    for (const monthKey of monthSet) {
      const [year, month] = monthKey.split("-").map(Number);
      const daysInMonth = new Date(year, month, 0).getDate();
      for (let day = 1; day <= daysInMonth; day++) {
        const date = new Date(year, month - 1, day, 10, 0, 0, 0);
        const dateString = date.toISOString().split("T")[0];
        const entry = enteredByDayData.find(
          (e) => e.date.toISOString().split("T")[0] === dateString
        );
        enteredByDayFormatted.push({
          value: entry ? entry._sum.entered ?? 0 : 0,
          label: day.toString(),
          date: dateString,
        });
      }
    }

    return res.status(200).json({
      currentVisitors,
      enteredToday: enteredToday._sum.entered || 0,
      enteredThisHour: enteredThisHour._sum.entered || 0,
      enteredByHour: enteredByHourFormatted,
      enteredByDay: enteredByDayFormatted,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

function isSameDay(date1: Date, date2: Date): boolean {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
}

export default authMiddleware(handler);
