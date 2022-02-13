import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { Reminder } from '../../reminders/dto/reminder.dto';
import { Repository } from '../../shared/providers/repository';

export type ReminderCreateInput = SafeRecordModification<Prisma.ReminderCreateWithoutUserInput & { userId: number }>;

@Injectable()
export class RemindersRepository extends Repository<Reminder> {
  public async create(data: ReminderCreateInput) {
    const reminder = await this.prisma.reminder.create({
      data,
    });

    return reminder;
  }

  public async get(id: number) {
    const reminder = await this.prisma.reminder.findFirst({
      where: {
        id,
      },
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

  public patch(id: number, data: Partial<SafeRecordModification<Reminder>>): Promise<Reminder> {
    return this.prisma.reminder.update({
      where: {
        id,
      },
      data,
    });
  }

  public delete(id: number) {
    return this.prisma.reminder.delete({
      where: {
        id,
      },
    });
  }

  get deleteMany() {
    return this.prisma.reminder.deleteMany;
  }
}
