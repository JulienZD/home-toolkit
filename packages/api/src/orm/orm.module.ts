import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { RemindersRepository } from './repositories/reminders.repository';
import { UsersRepository } from './repositories/users.repository';

const repositories = [UsersRepository, RemindersRepository];

@Module({
  imports: [],
  providers: [PrismaService, ...repositories],
  exports: [...repositories],
})
export class OrmModule {}
