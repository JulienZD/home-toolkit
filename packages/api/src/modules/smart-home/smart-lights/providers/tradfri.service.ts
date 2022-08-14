import { AccessoryTypes, TradfriClient, type Accessory } from 'node-tradfri-client';

import {
  ISmartLight,
  ISmartLightOperation,
  ISmartLightOperationResult,
  ISmartLightsService,
} from '../smart-lights.service';

interface ITradfriOptions {
  securityCode: string;
  host?: string;
  identity?: string;
  psk?: string;
}

export class TradfriService extends ISmartLightsService {
  private tradfriClient: TradfriClient;

  constructor(options: ITradfriOptions) {
    super();

    this.tradfriClient = new TradfriClient(options?.host ?? '');
  }

  // @ts-expect-error Unused value will be implemented
  public async updateLight(lightId: string, operation: ISmartLightOperation): Promise<ISmartLightOperationResult> {
    const light = this.findLight(lightId);
    if (!light) {
      throw new Error('Light not found');
    }

    await this.tradfriClient.updateDevice(light);

    return {} as ISmartLightOperationResult;
  }

  public async getLights(): Promise<ISmartLight[]> {
    return Object.values(this.tradfriClient.devices)
      .filter((dev) => dev.type === AccessoryTypes.lightbulb)
      .map((device) => {
        const [light] = device.lightList;
        return {
          id: String(device.instanceId),
          brightness: light.dimmer,
          isOn: light.onOff,
          color: light.color,
        };
      });
  }

  // @ts-expect-error Unused value will be implemented
  private findLight(lightId: string): Accessory | null {
    return null;
  }
}
