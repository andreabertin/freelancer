import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';
import { APP_CONFIG_KEY, AppConfig } from '@configs/app.config';
import logger from '@configs/logging.config';
import { NatsOptions, Transport } from "@nestjs/microservices";
import { MicroserviceConfig, MS_CONFIG_KEY } from "@configs/ms.config";

async function bootstrap() {

  // Creates app as a microservice App
  const app = await NestFactory.create(AppModule);

  // Sets up logging
  const config = app.get(ConfigService);
  const appConfig = config.getOrThrow<AppConfig>(APP_CONFIG_KEY);
  app.useLogger(logger(appConfig));

  const msConfig = config.getOrThrow<MicroserviceConfig>(MS_CONFIG_KEY);
  const i : NatsOptions = {
    transport: Transport[msConfig.transport],
    options: {
      url: msConfig.url,
      queue: msConfig.queue
    }
  };
  app.connectMicroservice(i);

  // Starts all microservices
  await app.startAllMicroservices();

  // Then start listen
  await app.listen(4000, () => {});
}

bootstrap();
