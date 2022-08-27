import { createZodDto } from '@anatine/zod-nestjs';
import { ISmartLightOperation } from '@home-toolkit/types/smart-home';
import { z } from 'zod';

export class UpdateLightDto
  extends createZodDto(
    z
      .object({
        brightness: z.number().min(0).max(100),
        color: z.string(),
        isOn: z.boolean(),
      })
      .partial()
  )
  implements ISmartLightOperation {}
