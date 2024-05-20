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
          increment: 1,
        },
        entered: {
          increment: 1,
        },
      },
      create: {
        id: `data_${Date.now()}`, // Ensure you import and use a UUID library for this
        deviceId: id,
        date: currentDate,
        hour: hour,
        visitors: 1,
        entered: 1,
        exited: 0,
      },
    });

    return res.status(200).json(dataEntry);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
}
