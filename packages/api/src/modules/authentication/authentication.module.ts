import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from '~/modules/users/users.module';
import { AuthenticationController } from './authentication.controller';
import { AuthenticationService } from './authentication.service';
import { JwtStrategy } from './strategies/jwt.strategy';
import { LocalStrategy } from './strategies/local.strategy';
import { WSJwtStrategy } from './strategies/ws-jwt.strategy';

@Module({
  imports: [
    ConfigModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('authentication.jwt.secret'),
        signOptions: { expiresIn: configService.get<string>('authentication.jwt.expiresIn') },
        verifyOptions: {
          audience: configService.get<string>('authentication.jwt.audience'),
          issuer: configService.get<string>('authentication.jwt.issuer'),
        },
      }),
      inject: [ConfigService],
    }),
    UsersModule,
    PassportModule,
  ],
  controllers: [AuthenticationController],
  providers: [AuthenticationService, LocalStrategy, JwtStrategy, WSJwtStrategy],
})
export class AuthenticationModule {}
