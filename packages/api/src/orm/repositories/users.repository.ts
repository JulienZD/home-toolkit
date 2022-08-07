import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { Repository } from '../../shared/providers/repository';
import { User } from '../../users/dto/user.dto';

export type UserCreateInput = SafeRecordModification<Prisma.UserCreateInput>;

@Injectable()
export class UsersRepository extends Repository<User> {
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

  public patch(id: number, data: Partial<SafeRecordModification<User>>): Promise<User> {
    return this.prisma.user.update({
      where: {
        id,
      },
      data,
    });
  }

  public async delete(id: number) {
    return this.prisma.user.delete({
      where: {
        id,
      },
    });
  }
}
