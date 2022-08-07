import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import type { User } from '@prisma/client';
import bcrypt from 'bcrypt';
import { UsersService } from '~/users/users.service';
import type { LoginDto, RegistrationDto } from './dto';

export interface AuthenticationResult {
  user: User;
  accessToken: string;
}

@Injectable()
export class AuthenticationService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private configService: ConfigService
  ) {}

  public async register(data: RegistrationDto): Promise<AuthenticationResult> {
    const existingUser = await this.usersService.findOne({
      OR: [{ email: data.email }, { username: data.username }],
    });
    if (existingUser) {
      throw new BadRequestException('A user with this email or username already exists');
    }

    data.password = await bcrypt.hash(data.password, 10);
    const user = await this.usersService.create(data);

    return this.createJwt(user);
  }

  public async validateUser({ email, password }: LoginDto): Promise<User | null> {
    const user = await this.usersService.findOne({
      email,
    });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return null;
    }

    return user;
  }

  public async login(user: User): Promise<AuthenticationResult> {
    return this.createJwt(user);
  }

  private createJwt(user: User) {
    const payload = {
      username: user.username,
      sub: user.id,
      audience: this.configService.get<string>('JWT_AUDIENCE'),
      issuer: this.configService.get<string>('JWT_ISSUER'),
    };

    return {
      user,
      accessToken: this.jwtService.sign(payload),
    };
  }
}
