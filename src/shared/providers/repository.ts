import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
import { BaseEntity } from '../dto/base.entity';

@Injectable()
export abstract class Repository<T extends BaseEntity<T>> {
  constructor(protected readonly prisma: PrismaService) {}

  abstract create(data: SafeRecordModification<T>): Promise<T>;
  abstract get(id: number): Promise<T | null>;
  abstract find(where?: KeyIn<T>): Promise<T[]>;
  abstract findOne(where: KeyIn<T>): Promise<T | null>;
  abstract patch(id: number, data: ModifyData<T>): Promise<T>;
  abstract delete(id: number): Promise<T>;
}
