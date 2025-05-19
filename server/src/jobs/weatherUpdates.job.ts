import cron from "node-cron";
import { Frequency } from "@prisma/client";

import * as weatherService from "../services/weather.service";
import { sendWeatherUpdateEmail } from "../mailer/mailBuilders";

const CRON_FREQUENCY_MAP = {
  [Frequency.DAILY]: "0 8 * * *",
  [Frequency.HOURLY]: "0 * * * *",
};

export const scheduleWeatherMailingCronJobs = () => {
  for (const [frequency, cronExpression] of Object.entries(
    CRON_FREQUENCY_MAP
  )) {
    cron.schedule(cronExpression, async () => {
      const usersSubscriptions =
        await weatherService.getUsersConfirmedSubscriptionsByFrequency(
          frequency as Frequency
        );

      for (const [email, cities] of Object.entries(usersSubscriptions)) {
        const weatherData = await weatherService.getCitiesWeatherData(cities);
        await sendWeatherUpdateEmail(
          email,
          weatherData,
          frequency as Frequency
        );
      }
    });
  }
};
