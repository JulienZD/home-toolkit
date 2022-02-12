import { Injectable, NotFoundException } from '@nestjs/common';
import { User, UserCreateInput, UsersRepository } from '../orm/repositories/users.repository';

@Injectable()
export class UsersService {
  constructor(private readonly userRepository: UsersRepository) {}

  async find(): Promise<User[]> {
    return this.userRepository.find();
  }

  async get(id: number): Promise<User> {
    const user = await this.userRepository.findOne(id);
    if (!user) {
      throw new NotFoundException();
    }
    return user;
  }

  async create(user: UserCreateInput): Promise<User> {
    return this.userRepository.create(user);
  }
}
