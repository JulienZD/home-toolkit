import { Controller, Get, Patch, Param, Body, UseFilters } from '@nestjs/common';
import { UpdateLightDto } from './dto/light.dto';
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
  public async updateLight(@Param('id') id: string, @Body() data: UpdateLightDto) {
    return this.smartLightsService.updateLight(id, data);
  }
}
