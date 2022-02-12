import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { UsersRepository } from './repositories/users.repository';

@Module({
  imports: [],
  providers: [UsersRepository, PrismaService],
  exports: [UsersRepository],
})
export class OrmModule {}
