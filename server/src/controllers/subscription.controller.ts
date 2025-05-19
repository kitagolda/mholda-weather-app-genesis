import jwt from "jsonwebtoken";
import { Request, Response } from "express";
import { Frequency, Prisma } from "@prisma/client";

import { prisma } from "../lib/prisma";

import { sendConfirmationEmail } from "../mailer/mailBuilders";
import { SubscriptionFormData } from "../schemas/subscription.schema";

export const confirmSubscription = async (req: Request, res: Response) => {
  const { token } = req.query;

  if (!token || typeof token !== "string") {
    res.status(404).send("Token not found");
    return;
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);

    const { id } = decoded as { id: string };

    await prisma.subscription.update({
      where: { id },
      data: { confirmed: true },
    });

    res.send("Subscription confirmed successfully");
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      res.status(500).send("Failed to confirm subscription");
    } else {
      res.status(400).send("Invalid token");
    }
  }
};

export const subscribeToWeatherUpdate = async (
  req: Request<SubscriptionFormData>,
  res: Response
) => {
  const { email, city, frequency } = req.body;
  const normalizedFrequency = frequency.toUpperCase();

  try {
    await prisma.$transaction(async (prisma) => {
      const user = await prisma.user.upsert({
        where: { email },
        update: {},
        create: { email },
      });

      const subscription = await prisma.subscription.upsert({
        where: { userId_city: { userId: user.id, city } },
        update: { frequency: normalizedFrequency },
        create: { userId: user.id, city, frequency: normalizedFrequency },
      });

      const token = jwt.sign({ id: subscription.id }, process.env.JWT_SECRET!, {
        expiresIn: "24h",
      });

      await sendConfirmationEmail(email, city, token);
    });

    res.send("Subscription successful. Confirmation email sent.");
  } catch {
    res.status(500).send("Subscription failed. Please try again later.");
  }
};

export const unsubscribeFromUpdateByFrequency = async (
  req: Request,
  res: Response
) => {
  const { token } = req.query;
  if (!token || typeof token !== "string") {
    res.status(404).send("Token not found");
    return;
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);

    const { frequency, email } = decoded as {
      frequency: Frequency;
      email: string;
    };

    const userSubscriptions = await prisma.subscription.findMany({
      where: { user: { email }, frequency },
    });

    await Promise.all(
      userSubscriptions.map(({ id }) =>
        prisma.subscription.delete({
          where: { id },
        })
      )
    );

    res.send("Unsubscribed successfully");
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      res.status(500).send("Failed to unsubscribe");
    } else {
      res.status(400).send("Invalid token");
    }
  }
};
