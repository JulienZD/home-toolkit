import { Injectable } from '@nestjs/common';

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
  public abstract updateLight(lightId: string, operation: ISmartLightOperation): Promise<ISmartLightOperationResult>;
  public abstract getLights(): Promise<ISmartLight[]>;
}
