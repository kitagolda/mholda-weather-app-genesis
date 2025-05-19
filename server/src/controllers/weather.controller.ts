import { Request, Response } from "express";

import { getWeatherByCity } from "../services/weatherApi.service";

export const cityWeather = async (req: Request, res: Response) => {
  const { city } = req.query;
  const cityData = await getWeatherByCity(city as string);

  res.json(cityData);
};
