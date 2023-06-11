import { registerAs } from '@nestjs/config';
import * as process from 'process';

export interface MicroserviceConfig {
  transport: string,
  url: string
}

export interface GatewayConfig {
  customerMs: MicroserviceConfig;
}

export const GW_CONFIG_KEY = 'gw';

export default registerAs(
  GW_CONFIG_KEY,
  (): GatewayConfig => ({
    customerMs: {
      transport: process.env.CUSTOMER_TRANSPORT || 'NATS',
      url: process.env.CUSTOMER_TRANSPORT || 'nats://localhost:4222'
    }
  }),
);
