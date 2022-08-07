import { ArgumentMetadata } from '@nestjs/common';
import { ProtectFieldsPipe } from './protect-fields.pipe';

class Dto {}

describe('ProtectFieldsPipe', () => {
  it('should be defined', () => {
    expect(new ProtectFieldsPipe({ method: 'POST' } as any)).toBeDefined();
  });

  it('removes `id, `createdAt`, `updatedAt` and `deletedAt` by default', () => {
    const protectedFields = ['id', 'createdAt', 'updatedAt', 'deletedAt'];

    const input = {
      id: 5,
      email: 'email@example.com',
      password: 'password',
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: new Date(),
    };

    const metadata: ArgumentMetadata = {
      type: 'body',
      metatype: Dto,
      data: '',
    };

    const result = new ProtectFieldsPipe({ method: 'POST' } as any).transform(input, metadata);

    protectedFields.forEach((field) => expect(result).not.toHaveProperty(field));

    expect(result).toHaveProperty('email');
    expect(result).toHaveProperty('password');
  });

  it('removes additional extra fields if specified', () => {
    const extraFields = ['emailValidated'];

    const input = {
      id: 5,
      email: 'email@example.com',
      password: 'password',
      emailValidated: true,
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: new Date(),
    };

    const metadata: ArgumentMetadata = {
      type: 'body',
      metatype: Dto,
    };

    const result = new ProtectFieldsPipe({ method: 'POST' } as any, ...extraFields).transform(input, metadata);

    extraFields.forEach((field) => expect(result).not.toHaveProperty(field));

    expect(result).toHaveProperty('email');
    expect(result).toHaveProperty('password');
  });
});
