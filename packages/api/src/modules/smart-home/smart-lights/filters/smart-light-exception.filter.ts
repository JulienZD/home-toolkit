import { ArgumentsHost, Catch, NotFoundException } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { LightNotFoundError, SmartLightError } from '../smart-light-errors';

@Catch(SmartLightError)
export class SmartLightExceptionFilter extends BaseExceptionFilter {
  catch(exception: SmartLightError, host: ArgumentsHost) {
    if (exception instanceof LightNotFoundError) {
      throw new NotFoundException();
    }

    super.catch(exception, host);
  }
}
