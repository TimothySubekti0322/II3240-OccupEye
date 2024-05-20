// pages/api/sensor/[id]/enter.ts

import type { NextApiRequest, NextApiResponse } from "next";
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
    const currentDate = new Date();
    const hour = currentDate.getHours();
    currentDate.setHours(10, 0, 0, 0);

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
          entered: {
            increment: 1,
          },
          visitors: {
            increment: 1,
          },
        },
      });
    }

    else {
      dataEntry = await prisma.data.create({
        data: {
          id: `data_${Date.now()}`,
          deviceId: id,
          date: currentDate,
          hour: hour,
          visitors: 1,
          entered: 1,
          exited: 0,
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
