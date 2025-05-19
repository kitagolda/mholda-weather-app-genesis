import { Request, Response } from "express";

import { getCityByName } from "../services/weatherApi.service";

export const searchCities = async (req: Request, res: Response) => {
  const { search } = req.query;
  const cityData = await getCityByName(search as string);

  res.json(cityData);
};
