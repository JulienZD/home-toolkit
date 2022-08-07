import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { UserCreateInput } from '../orm/repositories/users.repository';
import { User } from './dto/user.dto';
import { UsersService } from './users.service';

@Controller('users')
@UseInterceptors(ClassSerializerInterceptor)
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
