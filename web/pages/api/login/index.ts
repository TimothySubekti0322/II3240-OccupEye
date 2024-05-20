// pages/api/login

import type { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import prisma from "../prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // if (req.method !== "POST") {
  //   return res.status(405).json({ message: "Method not allowed", status: 405 });
  // }
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .json({ message: "Email and password are required", status: 400 });
  }

  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return res
        .status(200)
        .json({ message: "Email Not Registered", status: 404 });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(200).json({ message: "Invalid password", status: 401 });
    }

    const payload = {
      email: user.email,
      name: user.name,
      password: user.password,
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET!, {
      expiresIn: "31d",
    });

    return res.status(200).json({
      message: "success",
      token: token,
      payload: payload,
      status: 200,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
}
