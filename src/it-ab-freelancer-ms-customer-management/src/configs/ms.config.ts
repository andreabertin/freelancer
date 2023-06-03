import { registerAs } from '@nestjs/config';
import * as process from 'process';
import { Transport } from "@nestjs/microservices/enums/transport.enum";

export interface MicroserviceConfig {
  url: string;
  queue: string;
  transport: string;
}

export const MS_CONFIG_KEY = 'microservice';

export default registerAs(
  MS_CONFIG_KEY,
  (): MicroserviceConfig => ({
    url: process.env.MS_URL || 'nats://localhost:4222',
    queue: process.env.MS_QUEUE || 'customers',
    transport: process.env.MS_TRANSPORT || 'NATS'
  }),
);
