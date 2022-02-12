import { Exclude } from 'class-transformer';
import { User as PrismaUser } from '@prisma/client';

export class User implements PrismaUser {
  id!: number;
  email!: string;
  username!: string;

  @Exclude()
  password!: string;

  createdAt!: Date;
  updatedAt!: Date;

  constructor(partial: Partial<User>) {
    Object.assign(this, partial);
  }
}
