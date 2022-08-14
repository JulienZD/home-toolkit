import { Logger } from '@nestjs/common';
import { AccessoryTypes, discoverGateway, TradfriClient, type Accessory, type Group } from 'node-tradfri-client';

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
  private tradfriClient!: TradfriClient;
  // @ts-expect-error Unused value will be implemented
  private lightbulbs: Record<string, Accessory> = {};
  // @ts-expect-error Unused value will be implemented
  private groups: Record<string, Group> = {};

  constructor(private tradfriConfig: ITradfriOptions) {
    super('TradfriService');
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

  protected async establishConnection(): Promise<void> {
    this.tradfriClient = await this.authenticateAndConnect();
  }

  private async authenticateAndConnect(): Promise<TradfriClient> {
    try {
      this.logger.debug('Attempting to automatically discover gateway');
      const gateway = await discoverGateway();
      if (!gateway && !this.tradfriConfig.host) {
        throw new Error('NO_GATEWAY_FOUND');
      }

      const host = this.tradfriConfig.host ?? gateway?.host;
      if (!host) {
        throw new Error('NO_HOST');
      }

      const tradfriClient = this.createClient(host);

      const { identity, psk } = await this.getCredentials(tradfriClient);

      await tradfriClient.connect(identity, psk);

      this.logger.log('Connected to Trådfri hub');

      return tradfriClient;
    } catch (error) {
      if (error instanceof Error) {
        this.logger.error(error.message, error.stack);
      } else {
        this.logger.error('An unknown error occurred', undefined, JSON.stringify(error));
      }

      throw error;
    }
  }

  private createClient(host: string): TradfriClient {
    const tradfriClientLogger = new Logger('TradfriClient');

    return new TradfriClient(host, {
      customLogger: (msg, severity): void => {
        if (msg.includes('psk')) return;

        if (severity && severity !== 'silly') {
          const logMethod = severity === 'info' ? 'log' : severity;
          tradfriClientLogger[logMethod](msg);
        }
      },
    });
  }

  private async getCredentials(client: TradfriClient): Promise<{ psk: string; identity: string }> {
    if (this.tradfriConfig.identity && this.tradfriConfig.psk) {
      this.logger.debug('Using provided Identity and PSK values');
      return { identity: this.tradfriConfig.identity, psk: this.tradfriConfig.psk };
    }

    if (!this.tradfriConfig.securityCode) {
      throw new Error('NO_TRADFRI_SECURITY_CODE');
    }

    this.logger.warn('No Identity / PSK pair defined. Creating a new one');
    const { identity, psk } = await client.authenticate(this.tradfriConfig.securityCode);
    this.logger.debug(`Created Identity / PSK pair:\nIdentity: ${identity}\nPSK: ${psk}`);
    return { identity, psk };
  }

  // @ts-expect-error Unused value will be implemented
  private findLight(lightId: string): Accessory | null {
    return null;
  }
}
