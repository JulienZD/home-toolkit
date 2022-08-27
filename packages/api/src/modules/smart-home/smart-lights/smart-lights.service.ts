import { Injectable, Logger } from '@nestjs/common';
import type { ISmartLight, ISmartLightOperation, ISmartLightOperationResult } from '@home-toolkit/types/smart-home';

/**
 * Used to interact with a smart light setup (e.g. IKEA Trådfri or Philips Hue)
 */
@Injectable()
export abstract class ISmartLightsService {
  protected logger: Logger;

  constructor(serviceName: string) {
    this.logger = new Logger(serviceName);
    this.establishConnection().catch((error) => {
      this.logger.error(`Setup error ${error.message}`, error.stack);
      throw error;
    });
  }

  public abstract updateLight(lightId: string, operation: ISmartLightOperation): Promise<ISmartLightOperationResult>;
  public abstract getLights(): Promise<ISmartLight[]>;
  protected abstract establishConnection(): Promise<void>;
}
