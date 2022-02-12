import { Injectable, Optional, PipeTransform } from '@nestjs/common';

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
@Injectable()
export class ProtectFieldsPipe implements PipeTransform {
  private fieldsToDelete: string[];
  constructor(@Optional() ...extraFields: string[]) {
    this.fieldsToDelete = [...protectedFields, ...(extraFields.filter(Boolean) ?? [])];
  }

  transform(value: ProtectedFields & { [key: string]: any }) {
    this.fieldsToDelete.forEach((field) => delete value[field]);
    return value;
  }
}
