import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../../prisma.service';
import { User } from '../../users/dto/user.dto';

export type UserCreateInput = Prisma.UserCreateInput;

@Injectable()
export class UsersRepository {
  constructor(private prisma: PrismaService) {}

  public async create(data: UserCreateInput) {
    const user = await this.prisma.user.create({
      data,
    });

    return new User(user);
  }

  public async get(id: number) {
    const user = await this.prisma.user.findFirst({
      where: {
        id,
      },
    });
    if (!user) {
      return null;
    }
    return new User(user);
  }

  public async find(where: Prisma.UserWhereInput = {}) {
    const users = await this.prisma.user.findMany({ where });
    return users.map((u) => new User(u));
  }

  public async findOne(where: Prisma.UserWhereInput) {
    const user = await this.prisma.user.findFirst({ where });
    if (!user) {
      return null;
    }
    return new User(user);
  }

  get delete() {
    return this.prisma.user.delete;
  }

  get deleteMany() {
    return this.prisma.user.deleteMany;
  }
}
