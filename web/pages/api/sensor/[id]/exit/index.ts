// pages/api/sensor/[id]/exit

import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

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

    const dataEntry = await prisma.data.upsert({
      where: {
        deviceId_date_hour: {
          deviceId: id,
          date: currentDate,
          hour: hour,
        },
      },
      update: {
        visitors: {
          decrement: 1,
        },
        exited: {
          increment: 1,
        },
      },
      create: {
        id: `data_${Date.now()}`, // Ensure you import and use a UUID library for this
        deviceId: id,
        date: currentDate,
        hour: hour,
        visitors: 0,
        entered: 0,
        exited: 1,
      },
    });

    return res.status(200).json(dataEntry);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
}
