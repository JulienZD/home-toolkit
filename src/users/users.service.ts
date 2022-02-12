import { Injectable, NotFoundException } from '@nestjs/common';
import { UserCreateInput, UsersRepository } from '../orm/repositories/users.repository';
import { User } from './dto/user.dto';

@Injectable()
export class UsersService {
  constructor(private readonly userRepository: UsersRepository) {}

  async find(): Promise<User[]> {
    return this.userRepository.find();
  }

  async get(id: number): Promise<User> {
    const user = await this.userRepository.get(id);
    if (!user) {
      throw new NotFoundException();
    }
    return user;
  }

  async create(user: UserCreateInput): Promise<User> {
    return this.userRepository.create(user);
  }
}
