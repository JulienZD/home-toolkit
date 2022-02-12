import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthenticationModule } from './authentication/authentication.module';
import { OrmModule } from './orm/orm.module';
import { PrismaService } from './prisma.service';
import { SharedModule } from './shared/shared.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [ConfigModule.forRoot(), UsersModule, OrmModule, SharedModule, AuthenticationModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
