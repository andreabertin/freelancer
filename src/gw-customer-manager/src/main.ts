import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { APP_CONFIG_KEY, AppConfig } from "@configs/app.config";
import { ConfigService } from "@nestjs/config";
import logger from '@configs/logging.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = app.get(ConfigService);
  const appConfig = config.getOrThrow<AppConfig>(APP_CONFIG_KEY);
  app.useLogger(logger(appConfig));

  await app.listen(appConfig.port);
}
bootstrap();
