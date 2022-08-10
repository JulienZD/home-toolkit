import { Module } from '@nestjs/common';
import { RemindersService } from './reminders.service';
import { RemindersController } from './reminders.controller';
import { PrismaModule } from '~/providers/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [RemindersService],
  controllers: [RemindersController],
})
export class RemindersModule {}
