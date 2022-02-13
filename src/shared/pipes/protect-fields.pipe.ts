/* eslint-disable @typescript-eslint/ban-types */
import { ArgumentMetadata, Inject, Injectable, Optional, PipeTransform, Scope } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';

const protectedFields = ['id', 'createdAt', 'updatedAt', 'deletedAt'] as const;
type ProtectedFields = {
  [field in typeof protectedFields[number]]?: any;
};

/**
 * Removes protected fields from create / update requests.
 *
 * By default, the following fields are removed:
 * - `id`
 * - `createdAt`
 * - `updatedAt`
 * - `deletedAt`
 *
 * Extra protected fields can be specified by passing a string array in the constructor.
 *
 * @example
 * // Protecting default fields only:
 * public async createUser(@Body(ProtectFieldsPipe) user: UserCreateInput): Promise<User> {
 *  return this.usersService.create(user);
 * }
 *
 * // Specifying extra fields to protect:
 * public async createUser(@Body(new ProtectFieldsPipe('emailValidated', 'isAdmin')) user: UserCreateInput): Promise<User> {
 *  return this.usersService.create(user);
 * }
 */
@Injectable({ scope: Scope.REQUEST })
export class ProtectFieldsPipe implements PipeTransform {
  private fieldsToDelete: string[];
  constructor(@Inject(REQUEST) private request: Request, @Optional() ...extraFields: string[]) {
    this.fieldsToDelete = [...protectedFields, ...(extraFields.filter(Boolean) ?? [])];
  }

  transform(value: ProtectedFields & { [key: string]: any }, { metatype }: ArgumentMetadata) {
    if (!['POST', 'PATCH', 'PUT'].includes(this.request.method)) {
      return value;
    }

    if (!metatype || !this.toValidate(metatype)) {
      return value;
    }
    this.fieldsToDelete.forEach((field) => delete value[field]);
    return value;
  }

  private toValidate(metatype: Function): boolean {
    const types: Function[] = [String, Boolean, Number, Array, Object];
    return !types.includes(metatype);
  }
}
