import { registerAs } from '@nestjs/config';
import * as process from 'process';

export interface MicroserviceConfig {
  transport: string,
  url: string
}

export const CUSTOMER_MS_CONFIG_KEY = 'customer_ms';

export default registerAs(
  CUSTOMER_MS_CONFIG_KEY,
  (): MicroserviceConfig => ({
      transport: process.env.CUSTOMER_TRANSPORT || 'NATS',
      url: process.env.CUSTOMER_TRANSPORT_URL || 'nats://localhost:4222'
  }),
);
