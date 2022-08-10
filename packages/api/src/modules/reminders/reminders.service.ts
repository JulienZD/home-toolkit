import { Injectable, Logger } from '@nestjs/common';
import type { Prisma } from '@prisma/client';
import { ReminderDto, UpdateReminderDto } from './dto/reminder.dto';
import { PrismaService } from '~/providers/prisma/prisma.service';

@Injectable()
export class RemindersService {
  private logger: Logger;

  constructor(private prisma: PrismaService) {
    this.logger = new Logger('RemindersService');
    this.logger.debug('Initialised');
  }

  public async create(data: ReminderDto) {
    const reminder = await this.prisma.reminder.create({
      data,
    });

    return reminder;
  }

  public async get(id: number) {
    const reminder = await this.prisma.reminder.findFirst({
      where: { id },
    });
    if (!reminder) {
      return null;
    }
    return reminder;
  }

  public async find(where: Prisma.ReminderWhereInput = {}) {
    const reminders = await this.prisma.reminder.findMany({ where });
    return reminders;
  }

  public async findOne(where: Prisma.ReminderWhereInput) {
    const reminder = await this.prisma.reminder.findFirst({ where });
    if (!reminder) {
      return null;
    }
    return reminder;
  }

  public patch(id: number, data: Partial<UpdateReminderDto>) {
    return this.prisma.reminder.update({
      where: { id },
      data,
    });
  }

  public delete(id: number) {
    return this.prisma.reminder.delete({
      where: { id },
    });
  }
}
