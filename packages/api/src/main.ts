import { ZodValidationPipe } from '@anatine/zod-nestjs';
import { VersioningType } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SensitiveDataFilterInterceptor } from './shared/interceptors/sensitive-data-filter.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1',
  });

  app.useGlobalPipes(new ZodValidationPipe());

  app.useGlobalInterceptors(new SensitiveDataFilterInterceptor(['password']));
  await app.listen(3000);
}
bootstrap();
