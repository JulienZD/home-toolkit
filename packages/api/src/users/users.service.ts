import { Injectable } from '@nestjs/common';
import { UsersRepository } from '../orm/repositories/users.repository';
import { Service } from '../shared/providers/service';
import { User } from './dto/user.dto';

@Injectable()
export class UsersService extends Service<User> {
  constructor(readonly userRepository: UsersRepository) {
    super(userRepository, 'users');
  }
}
