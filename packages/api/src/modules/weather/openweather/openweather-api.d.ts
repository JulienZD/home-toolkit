interface Coordinates {
  lon: number;
  lat: number;
}

interface Weather {
  /** Weather condition ID */
  id: number;
  /** Group of weather parameters (Rain, Clouds, etc.) */
  main: string;
  /** Weather condition within the group */
  description: string;
  /** Weather icon ID
   * http://openweathermap.org/img/wn/:icon.png
   */
  icon: string;
}

interface WeatherInfo {
  /** Temperature */
  temp: number;
  /** Temperature accounted for the human perception of weather */
  feels_like: number;
  /** Humidity percentage */
  humidity: number;
  temp_min: number;
  temp_max: number;
  pressure: number;
}

interface Wind {
  speed: number;
  deg: number;
}

interface Clouds {
  /** Cloudiness percentage */
  all: number;
}

interface Sys {
  /**
   * Internal
   * @private
   */
  type: number;
  /**
   * Internal
   * @private
   */
  id: number;
  /**
   * Internal
   * @private
   */
  message: number;
  /**
   * Country code
   */
  country: string;
  /** Sunrise time - UTC */
  sunrise: number;
  /** Sunset time - UTC */
  sunset: number;
}

/** Response for the `/weather` endpoint */
export interface CurrentWeatherResponse {
  coord: Coordinates;
  weather: Weather[];
  base: string;
  main: WeatherInfo;
  visibility: number;
  wind: Wind;
  clouds: Clouds;
  /** Time of data calculation */
  dt: number;
  sys: Sys;
  /** Shift in seconds from UTC */
  timezone: number;
  /** City ID */
  id: number;
  /** City name */
  name: string;
  /** Response status code */
  cod: number;
}
