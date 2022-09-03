import { IWeatherForecast } from '@home-toolkit/types/weather';
import { Observable } from 'rxjs';

export abstract class WeatherService {
  public abstract getCurrentWeather(lat: string, lon: string): Observable<IWeatherForecast>;
}
