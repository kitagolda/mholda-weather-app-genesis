import { Frequency } from "@prisma/client";

import * as weatherApi from "./weatherApi.service";

import { prisma } from "../lib/prisma";
import { WeatherData } from "../types";

export const getUsersConfirmedSubscriptionsByFrequency = async (
  frequency: Frequency
) => {
  const subscriptions = await prisma.subscription.findMany({
    where: { frequency, confirmed: true },
    include: { user: true },
  });

  const usersSubscriptions: Record<string, string[]> = {};

  for (const subscription of subscriptions) {
    const { user, city } = subscription;

    if (!usersSubscriptions[user.email]) {
      usersSubscriptions[user.email] = [];
    }
    usersSubscriptions[user.email].push(city);
  }

  return usersSubscriptions;
};

export const getCitiesWeatherData = async (cities: string[]) => {
  const weatherData: Record<string, WeatherData> = {};

  await Promise.all(
    cities.map(async (city) => {
      const weather = await weatherApi.getWeatherByCity(city);
      if (weather) {
        weatherData[city] = weather;
      } else {
        throw new Error(`Weather data not found for city: ${city}`);
      }
    })
  );

  return weatherData;
};
