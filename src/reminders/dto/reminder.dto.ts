import { Reminder as PrismaReminder } from '@prisma/client';
import { Type } from 'class-transformer';
import { IsDate, MinLength } from 'class-validator';
import { BaseEntity } from '../../shared/dto/base.entity';

export class Reminder extends BaseEntity<Reminder> implements PrismaReminder {
  @MinLength(3)
  title!: string;
  description!: string | null;

  @Type(() => Date)
  @IsDate()
  remindAt!: Date;
  userId!: number;
}
