import { Controller, Get, ImATeapotException, Version, VERSION_NEUTRAL } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Version(['1', VERSION_NEUTRAL])
  @Get('teapot')
  getTeapot(): ImATeapotException {
    throw new ImATeapotException();
  }
}
