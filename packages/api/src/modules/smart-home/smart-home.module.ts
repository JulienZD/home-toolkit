import { Module } from '@nestjs/common';
import { SmartLightsModule } from './smart-lights/smart-lights.module';
import { SmartHomeController } from './smart-home.controller';
import { RouterModule } from '@nestjs/core';

@Module({
  imports: [
    SmartLightsModule,
    RouterModule.register([
      {
        path: 'smart-home/lights',
        module: SmartLightsModule,
      },
    ]),
  ],
  providers: [],
  controllers: [SmartHomeController],
})
export class SmartHomeModule {}
