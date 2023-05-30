import { format, transports } from 'winston';
import { AppConfig } from '@configs/app.config';
import { WinstonModule } from 'nest-winston';

const file = (cfg: AppConfig, filename: string, level?: string) =>
  new transports.File({
    filename: `${cfg.logsPath}/${filename}.log`,
    level: level,
    format: format.combine(format.timestamp()),
    maxsize: cfg.logFileMaxSize,
    maxFiles: cfg.logFileLimit,
    tailable: true,
  });

// Creates error logging transport
const errorTransport = (cfg: AppConfig) => file(cfg, 'errors', 'error');

// Creates combined logging transport
const allTransport = (cfg: AppConfig) => file(cfg, 'app');

// Creates console logging transport
const consoleTransport = (cfg: AppConfig) =>
  new transports.Console({
    format: format.combine(
      format.cli(),
      format.splat(),
      format.timestamp(),
      format.printf((info) => {
        return `${info.timestamp} ${info.level}: ${info.message}`;
      }),
    ),
  });

const consoleExceptionHandler = (cfg: AppConfig) =>
  new transports.Console({
    format: format.cli(),
  });
const fileExceptionHandler = (cfg: AppConfig) => file(cfg, 'exceptions');

const consoleRejectionHandler = (cfg: AppConfig) =>
  new transports.Console({
    format: format.cli(),
  });
const fileRejectionHandler = (cfg: AppConfig) => file(cfg, 'rejections');

const logLevels = {
  fatal: 0,
  error: 1,
  warn: 2,
  info: 3,
  debug: 4,
  trace: 5,
};

export default (cfg: AppConfig) =>
  WinstonModule.createLogger({
    level: cfg.logLevel,
    levels: logLevels,
    format: format.combine(format.timestamp(), format.json()),
    transports: [errorTransport(cfg), allTransport(cfg), consoleTransport(cfg)],
    exceptionHandlers: [
      consoleExceptionHandler(cfg),
      fileExceptionHandler(cfg),
    ],
    rejectionHandlers: [
      consoleRejectionHandler(cfg),
      fileRejectionHandler(cfg),
    ],
  });
