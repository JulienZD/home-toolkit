import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AuthenticationModule } from '../../src/authentication/authentication.module';
import { UsersRepository } from '../../src/providers/prisma/repositories/users.repository';
import { User } from '../../src/modules/users/dto/user.dto';

describe('AuthenticationController (e2e)', () => {
  let app: INestApplication;
  let usersRepository: UsersRepository;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AuthenticationModule],
    })
      .overrideProvider(UsersRepository)
      .useValue({
        findOne: jest.fn().mockResolvedValue(null),
        create: jest.fn(async (val) => new User(val)),
      })
      .compile();

    app = moduleFixture.createNestApplication();
    usersRepository = await moduleFixture.resolve<UsersRepository>(UsersRepository);
    await app.init();
    jest.clearAllMocks();
  });

  describe('/authentication/register (POST)', () => {
    it('creates a user and returns the result and access token *without* the password', async () => {
      const { body } = await request(app.getHttpServer())
        .post('/authentication/register')
        .send({
          email: 'email123@example.com',
          password: 'hunter2hunter2',
          username: 'username',
        })
        .expect(201);
      const createSpy = jest.spyOn(usersRepository, 'create');
      const findOneSpy = jest.spyOn(usersRepository, 'findOne').mockResolvedValue(null);

      expect(findOneSpy).toHaveBeenCalled();
      expect(createSpy).toHaveBeenCalled();

      expect(body).not.toHaveProperty('user.password');
      expect(body).toHaveProperty('user.email');
      expect(body).toHaveProperty('user.username');
      expect(body).toHaveProperty('accessToken');
    });

    describe('throws an exception if a user already exists', () => {
      const existingUser = {
        id: 1,
        email: 'email123@example.com',
        username: 'username',
        password: '<hashed-password>',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      it('fails when the email is already taken', async () => {
        const createSpy = jest.spyOn(usersRepository, 'create');
        const findOneSpy = jest.spyOn(usersRepository, 'findOne').mockResolvedValue(existingUser);

        await request(app.getHttpServer())
          .post('/authentication/register')
          .send({
            email: 'email123@example.com',
            password: 'hunter2hunter2',
            username: 'uniqueusername',
          })
          .expect(400);

        expect(findOneSpy).toHaveBeenCalled();
        expect(createSpy).not.toHaveBeenCalled();
      });

      it('fails when the username is already taken', async () => {
        const createSpy = jest.spyOn(usersRepository, 'create');
        const findOneSpy = jest.spyOn(usersRepository, 'findOne').mockResolvedValue(existingUser);

        await request(app.getHttpServer())
          .post('/authentication/register')
          .send({
            email: 'unique-email@example.com',
            password: 'hunter2hunter2',
            username: 'username',
          })
          .expect(400);

        expect(findOneSpy).toHaveBeenCalled();
        expect(createSpy).not.toHaveBeenCalled();
      });
    });
  });
});
