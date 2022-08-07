import { Module } from '@nestjs/common';
import { OrmModule } from '../orm/orm.module';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  imports: [OrmModule],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
