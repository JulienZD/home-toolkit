import { Controller, Get } from '@nestjs/common';

@Controller('/smart-home')
export class SmartHomeController {
  @Get()
  public async getSmartHomeModules() {
    // TODO: Implement
    return [];
  }
}
