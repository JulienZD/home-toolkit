import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoggerMiddleware } from './middleware/logger.middleware';
import { AuthenticationModule } from './modules/authentication/authentication.module';
import { JwtAuthGuard } from './modules/authentication/guards/jwt-auth.guard';
import { RemindersModule } from './modules/reminders/reminders.module';
import { UsersModule } from './modules/users/users.module';
import { PrismaModule } from './providers/prisma/prisma.module';
import { SharedModule } from './modules/shared/shared.module';
import { SmartHomeModule } from './modules/smart-home/smart-home.module';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { WeatherModule } from './modules/weather/weather.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [
        async () => {
          const config = await import('config');
          return config.default;
        },
      ],
      ignoreEnvFile: true,
      cache: true,
    }),
    EventEmitterModule.forRoot(),
    UsersModule,
    PrismaModule,
    SharedModule,
    AuthenticationModule,
    RemindersModule,
    SmartHomeModule,
    WeatherModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
