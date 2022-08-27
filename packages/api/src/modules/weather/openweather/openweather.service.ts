import { IWeatherForecast } from '@home-toolkit/types/weather';
import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { map, Observable } from 'rxjs';
import { WeatherService } from '../weather.service';
import type { CurrentWeatherResponse } from './openweather-api';

@Injectable()
export class OpenWeatherService extends WeatherService {
  constructor(private apiKey: string, private httpService: HttpService) {
    super();
  }

  public getCurrentWeather(lat: string, lon: string): Observable<IWeatherForecast> {
    const url = this.buildURL('weather');
    url.searchParams.set('lat', lat);
    url.searchParams.set('lon', lon);

    return this.httpService.get<CurrentWeatherResponse>(url.href).pipe(
      map((res): IWeatherForecast => {
        const weatherData = res.data;

        return {
          temperature: {
            actual: weatherData.main.temp,
            feelsLike: weatherData.main.feels_like,
          },
          cloudPercentage: weatherData.clouds.all,
          description: weatherData.weather[0].description,
          main: weatherData.weather[0].main,
          humidity: weatherData.main.humidity,
          retrievalTime: weatherData.dt,
          sunrise: weatherData.sys.sunrise,
          sunset: weatherData.sys.sunset,
          wind: weatherData.wind,
        };
      })
    );
  }

  private buildURL(resource: string): URL {
    const baseUrl = new URL(`https://api.openweathermap.org/data/2.5/${resource}`);
    baseUrl.searchParams.set('appid', this.apiKey);
    baseUrl.searchParams.set('units', 'metric');

    return baseUrl;
  }
}
