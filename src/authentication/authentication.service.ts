import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersRepository } from '../orm/repositories/users.repository';
import { User } from '../users/dto/user.dto';
import { LoginDto } from './dto/login.dto';
import { RegistrationDto } from './dto/registration.dto';

export interface AuthenticationResult {
  user: User;
  accessToken: string;
}

@Injectable()
export class AuthenticationService {
  constructor(
    private usersRepository: UsersRepository,
    private jwtService: JwtService,
    private configService: ConfigService
  ) {}

  public async register(data: RegistrationDto): Promise<AuthenticationResult> {
    const userExists = await this.usersRepository.findOne({
      OR: [{ email: data.email }, { username: data.username }],
    });
    if (userExists) {
      throw new BadRequestException('A user with this email or username already exists');
    }

    data.password = await bcrypt.hash(data.password, 10);
    const user = await this.usersRepository.create(data);

    return this.createJwt(user);
  }

  public async validateUser({ email, password }: LoginDto): Promise<User | null> {
    const user = await this.usersRepository.findOne({
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
