import axios from "axios";

import { WeatherApiResponse, WeatherData } from "../types";

const ENDPOINTS = {
  current: "/current.json",
  search: "/search.json",
};

const mapWeatherResponse = (response: WeatherApiResponse): WeatherData => {
  return {
    temperature: response.current.temp_c,
    humidity: response.current.humidity,
    description: response.current.condition.text,
  };
};

export const buildUrl = (endpoint: string, ...args: string[]) => {
  return `${process.env.WEATHER_API_URL}${endpoint}?key=${
    process.env.WEATHER_API_KEY
  }&${args.join("&")}`;
};

export const getWeatherByCity = async (city: string) => {
  const url = buildUrl(ENDPOINTS.current, `q=${city}`);
  const response = await axios.get<WeatherApiResponse>(url);

  if (response.status !== 200) {
    throw new Error("Failed to fetch weather data");
  }

  return mapWeatherResponse(response.data);
};

export const getCityByName = async (city: string) => {
  const url = buildUrl(ENDPOINTS.search, `q=${city}`);
  const response = await axios.get(url);

  if (response.status !== 200) {
    throw new Error("Failed to fetch city data");
  }

  return response.data;
};
