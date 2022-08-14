import { Controller, Get, Patch, Param, Body } from '@nestjs/common';
import { ISmartLightsService, ISmartLightOperation } from './smart-lights.service';

@Controller()
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
