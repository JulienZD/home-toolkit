import { createZodDto } from '@anatine/zod-nestjs';
import type { IWeatherForecast } from '@home-toolkit/types/weather';
import { BadRequestException, Controller, Get, InternalServerErrorException, Query } from '@nestjs/common';
import { AxiosError } from 'axios';
import { catchError, Observable } from 'rxjs';
import { z } from 'zod';
import { WeatherService } from './weather.service';

class CoordinatesDto extends createZodDto(
  z.object({
    lat: z.string().refine((v) => isFinite(Number(v))),
    lon: z.string().refine((v) => isFinite(Number(v))),
  })
) {}

@Controller('weather')
export class WeatherController {
  constructor(private weatherService: WeatherService) {}

  @Get()
  public getWeatherForecast(@Query() coords: CoordinatesDto): Observable<IWeatherForecast> {
    return this.weatherService.getCurrentWeather(coords.lat, coords.lon).pipe(
      catchError((err) => {
        if (err instanceof AxiosError && err.response?.status === 400) {
          throw new BadRequestException(err.response?.data?.message ?? 'An unknown error occurred');
        }
        throw new InternalServerErrorException('An unknown error occurred');
      })
    );
  }
}
