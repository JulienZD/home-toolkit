import { createZodDto } from '@anatine/zod-nestjs';
import { z } from 'zod';

export class RegistrationDto extends createZodDto(
  z.object({
    email: z.string().email(),
    password: z.string().min(8),
    username: z.string().min(2),
  })
) {}

export class LoginDto extends createZodDto(
  z.object({
    email: z.string().email(),
    password: z.string(),
  })
) {}
