import { Controller, Get, Param, ParseIntPipe, UseGuards } from '@nestjs/common';
import { User } from '@prisma/client';
import { JwtAuthGuard } from '~/modules/authentication/guards/jwt-auth.guard';
import { UsersService } from './users.service';

@Controller('users')
@UseGuards(JwtAuthGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  public async getUsers(): Promise<User[]> {
    return this.usersService.find();
  }

  @Get(':id')
  public async getUser(@Param('id', ParseIntPipe) id: number): Promise<User | null> {
    return this.usersService.get(id);
  }
}
