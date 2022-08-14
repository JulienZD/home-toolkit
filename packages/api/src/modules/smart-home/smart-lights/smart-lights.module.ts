import { Module } from '@nestjs/common';
import { TradfriService } from './providers/tradfri.service';
import { SmartLightsController } from './smart-lights.controller';
import { ISmartLightsService } from './smart-lights.service';

// TODO: Convert into a dynamic light service resolver using a factory
const tempTradfriServiceProvider = {
  provide: ISmartLightsService,
  useValue: new TradfriService({} as never), // TODO: Pass correct config
};

@Module({
  providers: [tempTradfriServiceProvider],
  controllers: [SmartLightsController],
})
export class SmartLightsModule {}
