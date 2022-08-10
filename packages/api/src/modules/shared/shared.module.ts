import { Module } from '@nestjs/common';
import { APP_PIPE } from '@nestjs/core';
import { ProtectFieldsPipe } from './pipes/protect-fields.pipe';

const sharedComponents = [ProtectFieldsPipe];

@Module({
  providers: [
    ...sharedComponents,
    {
      provide: APP_PIPE,
      useClass: ProtectFieldsPipe,
    },
  ],
  exports: sharedComponents,
})
export class SharedModule {}
