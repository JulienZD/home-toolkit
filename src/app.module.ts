import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma.service';
import { UsersModule } from './users/users.module';
import { OrmModule } from './orm/orm.module';

@Module({
  imports: [UsersModule, OrmModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
