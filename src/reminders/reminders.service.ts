import { Injectable } from '@nestjs/common';
import { RemindersRepository } from '../orm/repositories/reminders.repository';
import { Service } from '../shared/providers/service';
import { Reminder } from './dto/reminder.dto';

@Injectable()
export class RemindersService extends Service<Reminder> {
  constructor(remindersRepository: RemindersRepository) {
    super(remindersRepository);
  }
}
