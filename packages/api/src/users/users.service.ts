import { Injectable, Logger } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '~/providers/prisma/prisma.service';

@Injectable()
export class UsersService {
  private logger: Logger;

  constructor(private prisma: PrismaService) {
    this.logger = new Logger('UsersService');
    this.logger.debug('Initialised');
  }

  public async create(data: SafeRecordModification<Prisma.UserCreateInput>) {
    return this.prisma.user.create({
      data,
    });
  }

  public async get(id: number) {
    return (
      (await this.prisma.user.findFirst({
        where: {
          id,
        },
      })) ?? null
    );
  }

  public async find(where: Prisma.UserWhereInput = {}) {
    return this.prisma.user.findMany({ where });
  }

  public async findOne(where: Prisma.UserWhereInput) {
    return (await this.prisma.user.findFirst({ where })) ?? null;
  }

  public patch(id: number, data: Partial<SafeRecordModification<Prisma.UserUpdateInput>>) {
    return this.prisma.user.update({
      where: { id },
      data,
    });
  }

  public async delete(id: number) {
    return this.prisma.user.delete({
      where: { id },
    });
  }
}
