import { Module } from '@nestjs/common';
import { ProtectFieldsPipe } from './pipes/protect-fields.pipe';

const sharedComponents = [ProtectFieldsPipe];

@Module({
  providers: sharedComponents,
  exports: sharedComponents,
})
export class SharedModule {}
