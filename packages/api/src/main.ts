import { VersioningType } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SensitiveDataFilterInterceptor } from '~/modules/shared/interceptors/sensitive-data-filter.interceptor';
import { AppModule } from './app.module';
import { AppZodValidationPipe } from './filters/zod-validation-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1',
  });

  app.useGlobalPipes(new AppZodValidationPipe());

  app.useGlobalInterceptors(new SensitiveDataFilterInterceptor(['password']));

  app.enableCors();

  app.enableShutdownHooks();

  await app.listen(3000);
}
bootstrap();
