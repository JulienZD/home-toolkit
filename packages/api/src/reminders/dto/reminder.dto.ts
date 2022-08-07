import { createZodDto } from '@anatine/zod-nestjs';
import { z } from 'zod';
import { zDateSchema } from '~/util/zod.helper';

export const ReminderModel = z.object({
  title: z.string().min(3).max(120),
  description: z.string().nullish(),
  remindAt: zDateSchema,

  userId: z.number(),
});

export class ReminderDto extends createZodDto(ReminderModel) {}

export class UpdateReminderDto extends createZodDto(ReminderModel.omit({ userId: true })) {}
