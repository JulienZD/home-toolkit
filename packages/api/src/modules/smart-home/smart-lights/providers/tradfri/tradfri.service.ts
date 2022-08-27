import type { ISmartLight, ISmartLightOperation, ISmartLightOperationResult } from '@home-toolkit/types/smart-home';
import { Logger, OnApplicationShutdown } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { discoverGateway, TradfriClient, type Accessory, type Group } from 'node-tradfri-client';
import { omitUndefined } from '~/util/omitUndefined';
import { LightNotFoundError } from '../../smart-light-errors';

import { ISmartLightsService } from '../../smart-lights.service';
import { isLightbulb } from './helpers';

interface ITradfriOptions {
  securityCode: string;
  host?: string;
  identity?: string;
  psk?: string;
}

// TODO: Extract internal connection + event listener logic to a separate class/service
export class TradfriService extends ISmartLightsService implements OnApplicationShutdown {
  private tradfriClient!: TradfriClient;

  private lightbulbs: Record<string, Accessory> = {};
  // @ts-expect-error Unused value will be implemented
  private groups: Record<string, Group> = {};

  constructor(private tradfriConfig: ITradfriOptions, private eventEmitter: EventEmitter2) {
    super('TradfriService');
  }

  public onApplicationShutdown() {
    this.logger.debug('Shutdown hook called - destroying client');
    this.tradfriClient?.destroy();
  }

  public async updateLight(lightId: string, operation: ISmartLightOperation): Promise<ISmartLightOperationResult> {
    const light = this.getLight(lightId);
    if (!light) {
      throw new LightNotFoundError();
    }

    const updateParams = omitUndefined({
      onOff: operation.isOn,
      dimmer: operation.brightness,
      color: operation.color,
    });

    if (!Object.keys(updateParams).length) {
      return {
        lightId,
        success: false,
        reason: 'No operation specified',
      };
    }

    await this.tradfriClient.operateLight(light, {
      ...updateParams,
      transitionTime: 0.25, // Ensure a reasonable transition speed
    });

    // We can't return the updated properties, as we don't have access to them yet since it's all event-based
    return {
      lightId,
      success: true,
    };
  }

  public async getLights(): Promise<ISmartLight[]> {
    return Object.values(this.lightbulbs).map((device) => {
      const [light] = device.lightList;
      return {
        id: String(device.instanceId),
        name: device.name,
        brightness: light.dimmer,
        isOn: light.onOff,
        color: light.color,
      };
    });
  }

  protected async establishConnection(): Promise<void> {
    this.tradfriClient = await this.authenticateAndConnect();

    await this.setupListeners();
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
      // TODO: Handle TradfriErrors
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

  private getLight(lightId: string): Accessory | undefined {
    return this.lightbulbs[+lightId];
  }

  private async setupListeners() {
    this.tradfriClient
      .on('device updated', this.handleDeviceUpdated.bind(this))
      .on('device removed', this.handleDeviceRemoved.bind(this))
      .observeDevices();
  }

  private handleDeviceUpdated(device: Accessory) {
    // We only care about lights
    if (!isLightbulb(device)) return;

    const [light] = device.lightList;
    this.logger.debug(
      `Device ${device.instanceId}: Update event > ${JSON.stringify({
        isOn: light.onOff,
        brightness: light.dimmer,
      })}`
    );

    this.lightbulbs[device.instanceId] = device;

    // TODO: Don't emit from this class?
    this.eventEmitter.emit('smarthome:light.updated', {
      id: device.instanceId,
      brightness: light.dimmer,
      isOn: light.onOff,
      name: device.name,
    });
  }

  private handleDeviceRemoved(instanceId: number) {
    this.logger.debug(`Device ${instanceId}: Remove event`);

    delete this.lightbulbs[instanceId];
  }
}
