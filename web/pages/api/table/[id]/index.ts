// pages/api/table/[id]

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
    const device = await prisma.data.findMany({
      where: {
        deviceId: id,
      },
      orderBy: [{ date: "asc" }, { hour: "asc" }],
    });

    if (!device) {
      return res.status(200).json({ message: "Device not found", status: 404 });
    }

    return res
      .status(200)
      .json({ message: "Success", data: device, status: 200 });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export default authMiddleware(handler);
