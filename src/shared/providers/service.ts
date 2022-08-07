import { Logger, NotFoundException } from '@nestjs/common';
import { capitalizeFirstLetter } from '../../util/string.helper';
import { BaseEntity } from '../dto/base.entity';
import { Repository } from './repository';

export abstract class Service<T extends BaseEntity<T>> {
  protected logger: Logger;
  constructor(private readonly repository: Repository<T>, serviceName: string) {
    const identifier = `${capitalizeFirstLetter(serviceName)}Service`;
    this.logger = new Logger(identifier);
    this.logger.debug(`Initialized`);
  }

  async create(data: SafeRecordModification<T>): Promise<T> {
    this.logger.log('Create');
    return this.repository.create(data);
  }

  async getAll(): Promise<T[]> {
    this.logger.log('Get all');
    return this.repository.find();
  }

  async get(id: number): Promise<T> {
    this.logger.log('Get');
    const result = await this.repository.get(id);
    if (!result) {
      throw new NotFoundException();
    }

    return result;
  }

  async find(where?: KeyIn<T>): Promise<T[]> {
    this.logger.log('Find');
    return this.repository.find(where);
  }

  async findOne(where: KeyIn<T>): Promise<T> {
    this.logger.log('Find one');
    const result = await this.repository.findOne(where);
    if (!result) {
      throw new NotFoundException();
    }

    return result;
  }

  async patch(id: number, data: ModifyData<T>): Promise<T> {
    this.logger.log('Patch');
    const exists = await this.get(id);
    if (!exists) {
      throw new NotFoundException();
    }
    return this.repository.patch(id, data);
  }

  async delete(id: number): Promise<T> {
    this.logger.log('Delete');
    try {
      return await this.repository.delete(id);
    } catch (e) {
      throw new NotFoundException();
    }
  }
}
