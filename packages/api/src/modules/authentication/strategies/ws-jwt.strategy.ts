import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UsersService } from '~/modules/users/users.service';

interface JwtPayload {
  sub: number;
  username: string;
}

@Injectable()
export class WSJwtStrategy extends PassportStrategy(Strategy, 'wsjwt') {
  constructor(private usersService: UsersService, configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([(req) => (req as any)?.auth?.token]),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_SECRET'),
    });
  }

  async validate(payload: JwtPayload) {
    return await this.usersService.get(payload.sub);
  }
}
