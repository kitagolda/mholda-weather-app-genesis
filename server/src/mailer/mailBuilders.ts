import jwt from "jsonwebtoken";
import { Frequency } from "@prisma/client";

import { transporter } from ".";
import { buildSubscribeEmailContent } from "./contents/subscribe";
import { buildWeatherEmailContent } from "./contents/weatherUpdate";

import { WeatherData } from "../types";

export const sendConfirmationEmail = async (
  email: string,
  city: string,
  token: string
) => {
  const confirmationLink = `${process.env.APP_DOMAIN}/api/confirm?token=${token}`;

  const subscribeTemplate = buildSubscribeEmailContent(city, confirmationLink);

  await transporter.sendMail({
    from: process.env.MAILER_USER,
    to: email,
    subject: `${city} Weather Subscription Confirmation`,
    html: subscribeTemplate,
  });
};

export const sendWeatherUpdateEmail = async (
  email: string,
  cities: Record<string, WeatherData>,
  frequency: Frequency
) => {
  const token = jwt.sign({ email, frequency }, process.env.JWT_SECRET!, {
    expiresIn: "24h",
  });

  const unsubscribeLink = `${process.env.APP_DOMAIN}/api/unsubscribe?token=${token}`;

  const weatherUpdatesTemplate = buildWeatherEmailContent(
    cities,
    unsubscribeLink,
    frequency
  );

  await transporter.sendMail({
    from: process.env.MAILER_USER,
    to: email,
    subject:
      frequency[0] + frequency.slice(1).toLowerCase() + " Weather Updates",
    html: weatherUpdatesTemplate,
  });
};
