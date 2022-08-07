import { ProtectFieldsPipe } from './protect-fields.pipe';

describe('ProtectFieldsPipe', () => {
  it('should be defined', () => {
    expect(new ProtectFieldsPipe()).toBeDefined();
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

    const result = new ProtectFieldsPipe().transform(input);

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

    const result = new ProtectFieldsPipe(...extraFields).transform(input);

    extraFields.forEach((field) => expect(result).not.toHaveProperty(field));

    expect(result).toHaveProperty('email');
    expect(result).toHaveProperty('password');
  });
});
