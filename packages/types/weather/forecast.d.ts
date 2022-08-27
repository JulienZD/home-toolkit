export interface IWeatherForecast {
  main: string;
  description: string;
  temperature: {
    actual: number;
    feelsLike: number;
  };
  humidity: number;
  wind: {
    speed: number;
    deg: number;
  };
  cloudPercentage: number;
  /** UTC unix time */
  sunrise: number;
  /** UTC unix time */
  sunset: number;
  /** UTC unix time */
  retrievalTime: number;
}
