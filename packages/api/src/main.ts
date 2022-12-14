import { VersioningType } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
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

  const config = app.get(ConfigService);
  const port = config.get('port', 3000);

  await app.listen(port, () => console.log('Nest app listening on port', port));
}
bootstrap();
