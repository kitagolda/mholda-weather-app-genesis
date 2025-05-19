import { Frequency } from "@prisma/client";

import { WeatherData } from "../../types";

const buildWeatherUpdateBlocks = (cities: Record<string, WeatherData>) =>
  Object.entries(cities)
    .map(
      ([city, data]) => `
    <div style="margin-bottom: 20px; padding: 10px; border: 1px solid #ddd; border-radius: 5px;">
      <h2 style="color: #007bff; margin-bottom: 0;">${city}</h2>
      <p style="margin: 0; font-size: 18px">${data.description}</p>
      <p style="margin: 0;"><b>Temperature:</b> ${data.temperature}°C</p>
      <p style="margin: 0;"><b>Humidity:</b> ${data.humidity}%</p>
    </div>
  `
    )
    .join("");

export const buildWeatherEmailContent = (
  cities: Record<string, WeatherData>,
  unsubscribeLink: string,
  frequency: Frequency
) => `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Weather Updates</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          background-color: #f4f4f4;
          margin: 0;
          padding: 0;
        }
        .email-container {
          max-width: 600px;
          margin: 20px auto;
          background: #ffffff;
          padding: 20px;
          border-radius: 8px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }
        .header {
          text-align: center;
          background-color: #007bff;
          color: #ffffff;
          padding: 10px 0;
          border-radius: 8px 8px 0 0;
        }
        .content {
          padding: 20px;
        }
        .unsubscribe {
          margin-top: 20px;
          text-align: center;
        }
        .unsubscribe a {
          color: #007bff;
          text-decoration: none;
        }
        .footer {
          margin-top: 20px;
          font-size: 12px;
          color: #888888;
          text-align: center;
        }
      </style>
    </head>
    <body>
      <div class="email-container">
        <div class="header">
          <h1>Weather Updates</h1>
        </div>
        <div class="content">
          ${buildWeatherUpdateBlocks(cities)}
        </div>
        <div class="unsubscribe">
          <p>
            <a href="${unsubscribeLink}">Unsubscribe from ${frequency.toLowerCase()} notifications</a>
          </p>
        </div>
        <div class="footer">
          <p>Thank you for staying updated with us!</p>
        </div>
      </div>
    </body>
    </html>
  `;
