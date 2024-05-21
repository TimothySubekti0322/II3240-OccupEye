// pages/api/device.ts

import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../prisma";
import authMiddleware from "../../../utils/authMiddleware";
import { v4 as uuidv4 } from "uuid";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;

  switch (method) {
    case "GET":
      return getDevices(req, res);
    case "POST":
      return authMiddleware(createDevice)(req, res);
    default:
      res.setHeader("Allow", ["GET", "POST"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
};

const getDevices = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const devices = await prisma.device.findMany();
    return res
      .status(200)
      .json({ message: "success", data: devices, status: 200 });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const createDevice = async (req: NextApiRequest, res: NextApiResponse) => {
  const { user } = req as any; // Use "as any" because the custom property is not in the type definition
  const { id, name } = req.body;

  if (!user.email) {
    return res.status(200).json({ message: "Unauthorized", status: 401 });
  }

  if (!name) {
    return res
      .status(200)
      .json({ message: "Device name is required", status: 400 });
  }

  try {
    const idDeviceIsRegistered = await prisma.device.findUnique({
      where: {
        id,
      },
    });

    if (idDeviceIsRegistered) {
      return res
        .status(200)
        .json({ message: "Device ID is already registered", status: 400 });
    }

    const newDevice = await prisma.device.create({
      data: {
        id: id,
        email: user.email,
        name,
      },
    });

    return res
      .status(201)
      .json({ message: "Device created", data: newDevice, status: 201 });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export default handler;
