// pages/api/sensor/[id]/exit

import type { NextApiRequest, NextApiResponse } from "next";
import convertTZ from "../../../../../utils/formatDate";
import prisma from "../../../prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { id } = req.query;

  if (!id || typeof id !== "string") {
    return res.status(400).json({ message: "Invalid device ID" });
  }

  try {
    const currentDate = convertTZ(new Date(), "Asia/Jakarta");
    console.log(currentDate);
    const hour = currentDate.getHours();
    console.log(hour);
    currentDate.setHours(10, 0, 0, 0);
    console.log(currentDate);

    // Check if the data entry exists
    const existingEntry = await prisma.data.findFirst({
      where: {
        deviceId: id,
        date: currentDate,
        hour: hour,
      },
    });

    let dataEntry;

    if (existingEntry) {
      dataEntry = await prisma.data.update({
        where: {
          id: existingEntry.id,
        },
        data: {
          exited: {
            increment: 1,
          },
          visitors: {
            decrement: 1,
          },
        },
      });
    } else {
      const latestData = await prisma.data.findFirst({
        where: {
          deviceId: id,
        },
        orderBy: [{ date: "desc" }, { hour: "desc" }],
        // Ensures only the latest entry is retrieved
        take: 1,
      });

      dataEntry = await prisma.data.create({
        data: {
          id: `data_${Date.now()}`,
          deviceId: id,
          date: currentDate,
          hour: hour,
          visitors: latestData ? latestData.visitors - 1 : 0,
          entered: 0,
          exited: 1,
        },
      });
    }

    return res
      .status(200)
      .json({ message: "success", data: dataEntry, status: 200 });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
}
