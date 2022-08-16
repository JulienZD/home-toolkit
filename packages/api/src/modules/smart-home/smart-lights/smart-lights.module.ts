import { Module, Provider } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TradfriService } from './providers/tradfri/tradfri.service';
import { SmartLightsController } from './smart-lights.controller';
import { ISmartLightsService } from './smart-lights.service';

// TODO: Convert into a dynamic light service resolver using a factory based on home settings
const tempTradfriServiceProvider: Provider<ISmartLightsService> = {
  provide: ISmartLightsService,
  useFactory: (configService: ConfigService) => {
    const securityCode = configService.get('TRADFRI_SECURITY_CODE');
    const psk = configService.get('TRADFRI_PSK');
    const identity = configService.get('TRADFRI_IDENTITY');

    return new TradfriService({
      securityCode,
      psk,
      identity,
    });
  },
  inject: [ConfigService],
};

@Module({
  imports: [ConfigModule],
  providers: [tempTradfriServiceProvider],
  controllers: [SmartLightsController],
})
export class SmartLightsModule {}
