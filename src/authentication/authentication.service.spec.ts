import { BadRequestException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { UsersRepository } from '../orm/repositories/users.repository';
import { AuthenticationService } from './authentication.service';
import * as bcrypt from 'bcrypt';

describe('AuthenticationService', () => {
  let service: AuthenticationService;
  let usersRepository: UsersRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthenticationService,
        {
          provide: UsersRepository,
          useValue: {
            create: jest.fn(),
            findOne: jest.fn(),
          },
        },
        {
          provide: JwtService,
          useValue: {
            sign: jest.fn(),
          },
        },
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn().mockReturnValue('value'),
          },
        },
      ],
    }).compile();

    service = module.get<AuthenticationService>(AuthenticationService);
    usersRepository = module.get<UsersRepository>(UsersRepository);

    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('register a new user', () => {
    const userToCreate = {
      email: 'email@example.com',
      username: 'username',
      password: 'strongpassword',
    };

    it('registers a new user', async () => {
      const createdUser = {
        ...userToCreate,
        id: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      const findOneSpy = jest.spyOn(usersRepository, 'findOne').mockResolvedValue(null);
      const createSpy = jest.spyOn(usersRepository, 'create').mockResolvedValue(createdUser);

      const result = await service.register(userToCreate);

      expect(findOneSpy).toHaveBeenCalled();
      expect(createSpy).toHaveBeenCalled();

      expect(result.user).toMatchObject(createdUser);
    });

    it('hashes the password', async () => {
      const createdUser = {
        ...userToCreate,
        id: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      const hashSpy = jest.spyOn(bcrypt, 'hash');
      jest.spyOn(usersRepository, 'findOne').mockResolvedValue(null);
      const createSpy = jest.spyOn(usersRepository, 'create').mockResolvedValue(createdUser);

      const result = await service.register(userToCreate);

      expect(hashSpy).toHaveBeenCalled();
      expect(createSpy).toHaveBeenCalled();

      expect(result.user).toMatchObject(createdUser);
      expect(result.user.password).not.toEqual(userToCreate.password);
    });

    it('throws when a user already exists', async () => {
      const createdUser = {
        ...userToCreate,
        id: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      const findOneSpy = jest.spyOn(usersRepository, 'findOne').mockResolvedValue(createdUser);
      const createSpy = jest.spyOn(usersRepository, 'create');

      expect(() => service.register(userToCreate)).rejects.toThrow(BadRequestException);
      expect(findOneSpy).toHaveBeenCalled();
      expect(createSpy).not.toHaveBeenCalled();
    });
  });
});
