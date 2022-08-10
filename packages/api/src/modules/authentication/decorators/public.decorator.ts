import { CustomDecorator, SetMetadata } from '@nestjs/common';

/**
 * Defines a controller or endpoint as publicly accessible
 */
export const Public = (): CustomDecorator => SetMetadata('PUBLIC', true);
