import { Test, TestingModule } from '@nestjs/testing';
import { AuthenticationController } from './authentication.controller';
import { AuthenticationService } from './authentication.service';

describe('AuthenticationController', () => {
  let controller: AuthenticationController;
  let authService: AuthenticationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthenticationController],
      providers: [
        {
          provide: AuthenticationService,
          useValue: {
            register: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<AuthenticationController>(AuthenticationController);
    authService = module.get<AuthenticationService>(AuthenticationService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('creates a user on registration', async () => {
    const createDetails = {
      email: 'email@example.com',
      password: 'hunter2hunter2',
      username: 'username',
    };

    const spy = jest.spyOn(authService, 'register').mockResolvedValue({
      user: {
        ...createDetails,
        id: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      accessToken: 'token',
    });
    const { user } = await controller.register({
      email: 'email@example.com',
      password: 'hunter2',
      username: 'username',
    });

    expect(spy).toHaveBeenCalled();
    expect(user.email).toEqual(createDetails.email);
    expect(user.username).toEqual(createDetails.username);
    expect(user).toHaveProperty('id');
  });
});
