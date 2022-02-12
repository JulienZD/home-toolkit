import { ImATeapotException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should return "Hello World"', () => {
      expect(appController.getHello()).toBe('Hello World');
    });
  });

  describe('/teapot', () => {
    it("should return a 418 I'm a Teapot exception", () => {
      expect(appController.getTeapot).toThrow(ImATeapotException);
    });
  });
});
