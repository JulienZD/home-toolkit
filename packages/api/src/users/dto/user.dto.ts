import { Exclude } from 'class-transformer';
import { User as PrismaUser } from '@prisma/client';
import { BaseEntity } from '../../shared/dto/base.entity';

export class User extends BaseEntity<User> implements PrismaUser {
  email!: string;
  username!: string;

  @Exclude()
  password!: string;
}
