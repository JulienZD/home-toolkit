import { Module } from '@nestjs/common';
import { RemindersService } from './reminders.service';
import { RemindersController } from './reminders.controller';
import { OrmModule } from '../orm/orm.module';

@Module({
  imports: [OrmModule],
  providers: [RemindersService],
  controllers: [RemindersController],
})
export class RemindersModule {}
