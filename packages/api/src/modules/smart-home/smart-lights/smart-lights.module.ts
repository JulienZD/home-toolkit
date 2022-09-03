import { Module, Provider } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { TradfriService } from './providers/tradfri/tradfri.service';
import { SmartLightsController } from './smart-lights.controller';
import { ISmartLightsService } from './smart-lights.service';

// TODO: Convert into a dynamic light service resolver using a factory based on home settings
const tempTradfriServiceProvider: Provider<ISmartLightsService> = {
  provide: ISmartLightsService,
  useFactory: (configService: ConfigService, eventEmitter: EventEmitter2) => {
    const securityCode = configService.get('smartHome.tradfri.securityCode');
    const psk = configService.get<string>('smartHome.tradfri.psk');
    const identity = configService.get<string>('smartHome.tradfri.identity');

    return new TradfriService(
      {
        securityCode,
        psk,
        identity,
      },
      eventEmitter
    );
  },
  inject: [ConfigService, EventEmitter2],
};

@Module({
  imports: [ConfigModule],
  providers: [tempTradfriServiceProvider],
  controllers: [SmartLightsController],
})
export class SmartLightsModule {}
