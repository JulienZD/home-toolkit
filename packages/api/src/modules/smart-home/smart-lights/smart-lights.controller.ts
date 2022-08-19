import type { ISmartLightOperation } from '@home-toolkit/types/smart-home';
import { Controller, Get, Patch, Param, Body, UseFilters } from '@nestjs/common';
import { SmartLightExceptionFilter } from './filters/smart-light-exception.filter';
import { ISmartLightsService } from './smart-lights.service';

@Controller()
@UseFilters(SmartLightExceptionFilter)
export class SmartLightsController {
  constructor(private smartLightsService: ISmartLightsService) {}

  @Get()
  public async getLights() {
    return this.smartLightsService.getLights();
  }

  @Patch(':id')
  public async updateLight(@Param('id') id: string, @Body() data: ISmartLightOperation) {
    return this.smartLightsService.updateLight(id, data);
  }
}
