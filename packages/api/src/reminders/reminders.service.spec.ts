import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '~/providers/prisma/prisma.service';
import { RemindersService } from './reminders.service';

describe('RemindersService', () => {
  let service: RemindersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RemindersService,
        {
          provide: PrismaService,
          useValue: {
            reminder: {
              create: jest.fn(),
              patch: jest.fn(),
              delete: jest.fn(),
              getAll: jest.fn(),
              get: jest.fn(),
            },
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
