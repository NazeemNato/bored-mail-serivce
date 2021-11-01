import { Request, Response } from "express";
import { PrismaClient } from ".prisma/client";
import { connection } from "../config/rabbitmq";
const prisma = new PrismaClient();

export const emailController = {
  addEmail: async (req: Request, res: Response) => {
    const { fullname, email } = req.body;
    if (!fullname || !email) {
      return res.status(400).json({
        success: false,
        message: "Please enter all fields",
      });
    }
    try {
      await prisma.email.create({
        data: {
          fullname,
          email,
        },
      });
      (await connection).createChannel().then((channel) => {
        channel.assertQueue("email-queue");
        channel.sendToQueue(
          "email-queue",
          Buffer.from(
            JSON.stringify({ fullname, email, welcome: true})
          )
        );
      });
      return res.status(200).json({
        success: true,
        message: "Email added successfully",
      });
    } catch (err) {
      return res.status(500).json({
        success: false,
        message: "Server Error",
      });
    }
  },
  getEmail: async (req: Request, res: Response) => {
    const emails = await prisma.email.findMany();
    return res.status(200).json({
      success: true,
      data: emails,
    });
  },
  deleteEmail: async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      await prisma.email.delete({
        where: {
          id: parseInt(id!),
        },
      });
      return res.status(200).json({
        success: true,
        message: "Email deleted successfully",
      });
    } catch (err) {
      return res.status(500).json({
        success: false,
        message: "Server Error",
      });
    }
  },
};
