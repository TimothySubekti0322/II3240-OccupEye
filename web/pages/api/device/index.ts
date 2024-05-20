import type { NextApiRequest, NextApiResponse } from "next";
import authMiddleware from "../../../utils/authMiddleware";
import prisma from "../prisma";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (req.method !== "GET") {
      return res.status(405).json({ message: "Method not allowed" });
    }
    const result = await prisma.device.findMany({});
    return res
      .status(200)
      .json({ message: "Success", data: result, status: 200 });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export default authMiddleware(handler);
