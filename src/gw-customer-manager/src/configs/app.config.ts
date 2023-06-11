import { registerAs } from '@nestjs/config';
import * as process from 'process';

export interface AppConfig {
  port: number;
  logLevel: string;
  logsPath: string;
  logFileMaxSize: number;
  logFileLimit: number;
}

export const APP_CONFIG_KEY = 'app';
const LOG_FILE_MAXSIZE = 1024 * 1024 * 10;
const LOG_FILE_LIMIT = 100;

export default registerAs(
  APP_CONFIG_KEY,
  (): AppConfig => ({
    port: parseInt(process.env.PORT, 10) || 3000,
    logLevel: process.env.LOG_LEVEL || 'info',
    logsPath: process.env.LOGS_PATH || 'logs',
    logFileLimit: parseInt(process.env.LOG_FILE_LIMIT) || LOG_FILE_LIMIT,
    logFileMaxSize: parseInt(process.env.LOG_FILE_MAXSIZE) || LOG_FILE_MAXSIZE,
  }),
);
