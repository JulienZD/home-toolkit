import { Module } from '@nestjs/common';
import { HttpModule, HttpService } from '@nestjs/axios';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { OpenWeatherService } from './openweather.service';
import { WeatherService } from '../weather.service';

const weatherService = {
  provide: WeatherService,
  useFactory: (configService: ConfigService, httpService: HttpService) => {
    return new OpenWeatherService(configService.get<string>('weather.openweather.apiKey') ?? '', httpService);
  },
  inject: [ConfigService, HttpService],
};

@Module({
  imports: [ConfigModule, HttpModule],
  providers: [weatherService],
  exports: [weatherService],
})
export class OpenWeatherModule {}
