import { Body, Controller, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import { User, UserCreateInput } from '../orm/repositories/users.repository';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  public async getUsers(): Promise<User[]> {
    return this.usersService.find();
  }

  @Get(':id')
  public async getUser(@Param('id', ParseIntPipe) id: number): Promise<User> {
    return this.usersService.get(id);
  }

  @Post()
  public async createUser(@Body() user: UserCreateInput): Promise<User> {
    return this.usersService.create(user);
  }
}
