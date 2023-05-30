import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';
import { APP_CONFIG_KEY, AppConfig } from '@configs/app.config';
import logger from '@configs/logging.config';
import { MicroserviceOptions, NatsOptions, Transport } from "@nestjs/microservices";
import { InboundMessageIdentityDeserializer } from "./serializers/inbound.serializer";
import { OutboundResponseIdentitySerializer } from "./serializers/outbound.serializer";

async function bootstrap() {

  const i : NatsOptions = {
    transport: Transport.NATS,
    options: {
      url: 'nats://localhost:4222',
      queue: 'customers'
    }
  };

  // Creates app as a microservice App
  const app = await NestFactory.createMicroservice(
    AppModule,
    i,
  );

  // Sets up logging
  const config = app.get(ConfigService);
  const appConfig = config.getOrThrow<AppConfig>(APP_CONFIG_KEY);
  app.useLogger(logger(appConfig));

  // Then start listen
  await app.listen();
}

bootstrap();
