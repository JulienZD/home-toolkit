import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OrmModule } from './orm/orm.module';
import { PrismaService } from './prisma.service';
import { SharedModule } from './shared/shared.module';

@Module({
  imports: [OrmModule, SharedModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
