import { Injectable, Logger } from '@nestjs/common';

export interface ISmartLight {
  id: string;
  color: string;
  brightness: number;
  isOn: boolean;
}

export type ISmartLightOperation = Partial<Omit<ISmartLight, 'id'>>;

export interface ISmartLightOperationResult extends Required<ISmartLightOperation> {
  lightId: string;
  success: boolean;
}

/**
 * Used to interact with a smart light setup (e.g. IKEA Trådfri or Philips Hue)
 */
@Injectable()
export abstract class ISmartLightsService {
  protected logger: Logger;

  constructor(serviceName: string) {
    this.logger = new Logger(serviceName);
    this.establishConnection();
  }

  public abstract updateLight(lightId: string, operation: ISmartLightOperation): Promise<ISmartLightOperationResult>;
  public abstract getLights(): Promise<ISmartLight[]>;
  protected abstract establishConnection(): Promise<void>;
}
