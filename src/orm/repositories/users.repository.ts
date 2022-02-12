import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { User as PrismaUser } from '@prisma/client';
import { PrismaService } from '../../prisma.service';

export type UserCreateInput = Prisma.UserCreateInput;
export type User = PrismaUser;

@Injectable()
export class UsersRepository {
  constructor(private prisma: PrismaService) {}

  public create(data: UserCreateInput) {
    return this.prisma.user.create({
      data,
    });
  }

  get find() {
    return this.prisma.user.findMany;
  }

  findOne(id: number) {
    return this.prisma.user.findFirst({
      where: {
        id,
      },
    });
  }

  get delete() {
    return this.prisma.user.delete;
  }

  get deleteMany() {
    return this.prisma.user.deleteMany;
  }
}
