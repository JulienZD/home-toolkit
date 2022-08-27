/**
 * This file is a slight modification of the ZodValidationPipe of @anatine/nestjs:
 *   https://github.com/anatine/zod-plugins/blob/main/packages/zod-nestjs/src/lib/zod-validation-pipe.ts
 *
 * The only change is the error formatting, as this previously wasn't done to easily display form errors.
 */

import { ZodDtoStatic } from '@anatine/zod-nestjs';
import { HTTP_ERRORS_BY_CODE } from '@anatine/zod-nestjs/src/lib/http-errors';
import { PipeTransform, Injectable, ArgumentMetadata, HttpStatus, Optional } from '@nestjs/common';

export interface AppZodValidationPipeOptions {
  errorHttpStatusCode?: keyof typeof HTTP_ERRORS_BY_CODE;
}

@Injectable()
export class AppZodValidationPipe implements PipeTransform {
  private readonly errorHttpStatusCode: keyof typeof HTTP_ERRORS_BY_CODE;

  constructor(@Optional() options?: AppZodValidationPipeOptions) {
    this.errorHttpStatusCode = options?.errorHttpStatusCode || HttpStatus.BAD_REQUEST;
  }

  public transform(value: unknown, metadata: ArgumentMetadata): unknown {
    const zodSchema = (metadata?.metatype as ZodDtoStatic)?.zodSchema;

    if (zodSchema) {
      const parseResult = zodSchema.safeParse(value);

      if (!parseResult.success) {
        const message = parseResult.error.flatten();

        throw new HTTP_ERRORS_BY_CODE[this.errorHttpStatusCode](message);
      }

      return parseResult.data;
    }

    return value;
  }
}
