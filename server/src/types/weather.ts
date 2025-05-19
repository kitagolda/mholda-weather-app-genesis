export interface WeatherApiResponse {
  current: {
    temp_c: number;
    humidity: number;
    condition: {
      text: string;
    };
  };
}

export interface WeatherData {
  temperature: number;
  humidity: number;
  description: string;
}
