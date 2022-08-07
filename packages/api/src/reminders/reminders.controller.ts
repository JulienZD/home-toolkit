import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../authentication/guards/jwt-auth.guard';
import { ConnectUser } from '../shared/decorators/connect-user.decorator';
import { Reminder } from './dto/reminder.dto';
import { RemindersService } from './reminders.service';

@Controller('reminders')
@UseGuards(JwtAuthGuard)
export class RemindersController {
  constructor(private remindersService: RemindersService) {}
  @Get()
  public async getReminders(): Promise<Reminder[]> {
    return this.remindersService.getAll();
  }

  @Get(':id')
  public async getReminder(@Param('id', ParseIntPipe) id: number): Promise<Reminder> {
    return this.remindersService.get(id);
  }

  @Post()
  public async createReminder(@ConnectUser() data: Reminder): Promise<Reminder> {
    return this.remindersService.create(data);
  }

  @Patch(':id')
  public async patchReminder(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: Partial<Reminder>
  ): Promise<Reminder> {
    return this.remindersService.patch(id, data);
  }

  @Delete(':id')
  public async deleteReminder(@Param('id', ParseIntPipe) id: number): Promise<Reminder> {
    return this.remindersService.delete(id);
  }
}
