import { Test, TestingModule } from '@nestjs/testing';
import { RemindersRepository } from '../orm/repositories/reminders.repository';
import { RemindersService } from './reminders.service';

describe('RemindersService', () => {
  let service: RemindersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RemindersService,
        {
          provide: RemindersRepository,
          useValue: {
            create: jest.fn(),
            patch: jest.fn(),
            delete: jest.fn(),
            getAll: jest.fn(),
            get: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<RemindersService>(RemindersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
