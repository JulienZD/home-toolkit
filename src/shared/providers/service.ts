import { NotFoundException } from '@nestjs/common';
import { BaseEntity } from '../dto/base.entity';
import { Repository } from './repository';

export abstract class Service<T extends BaseEntity<T>> {
  constructor(private repository: Repository<T>) {}

  async create(data: SafeRecordModification<T>): Promise<T> {
    return this.repository.create(data);
  }

  async getAll(): Promise<T[]> {
    return this.repository.find();
  }

  async get(id: number): Promise<T> {
    const result = await this.repository.get(id);
    if (!result) {
      throw new NotFoundException();
    }

    return result;
  }

  async find(where?: KeyIn<T>): Promise<T[]> {
    return this.repository.find(where);
  }

  async findOne(where: KeyIn<T>): Promise<T> {
    const result = await this.repository.findOne(where);
    if (!result) {
      throw new NotFoundException();
    }

    return result;
  }

  async patch(id: number, data: ModifyData<T>): Promise<T> {
    const exists = await this.get(id);
    if (!exists) {
      throw new NotFoundException();
    }
    return this.repository.patch(id, data);
  }

  async delete(id: number): Promise<T> {
    try {
      return await this.repository.delete(id);
    } catch (e) {
      throw new NotFoundException();
    }
  }
}
