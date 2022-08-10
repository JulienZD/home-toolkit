import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { Reminder } from '@prisma/client';
import { JwtAuthGuard } from '~/modules/authentication/guards/jwt-auth.guard';
import { AuthUser } from '~/modules/shared/decorators/auth-user.decorator';
import { ConnectUser } from '~/modules/shared/decorators/connect-user.decorator';
import { ReminderDto, UpdateReminderDto } from './dto/reminder.dto';
import { RemindersService } from './reminders.service';

@Controller('reminders')
@UseGuards(JwtAuthGuard)
export class RemindersController {
  constructor(private remindersService: RemindersService) {}

  @Get()
  public async getReminders(@AuthUser() user: { id: number }): Promise<Reminder[]> {
    return this.remindersService.find({ userId: user.id });
  }

  @Get(':id')
  public async getReminder(@Param('id', ParseIntPipe) id: number): Promise<Reminder> {
    const reminder = await this.remindersService.get(id);
    if (!reminder) {
      throw new NotFoundException();
    }
    return reminder;
  }

  @Post()
  public async createReminder(@ConnectUser() data: ReminderDto): Promise<Reminder> {
    return this.remindersService.create(data);
  }

  @Patch(':id')
  public async patchReminder(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: Partial<UpdateReminderDto>
  ): Promise<Reminder> {
    return this.remindersService.patch(id, data);
  }

  @Delete(':id')
  public async deleteReminder(@Param('id', ParseIntPipe) id: number): Promise<Reminder> {
    return this.remindersService.delete(id);
  }
}
