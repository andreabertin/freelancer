import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { getEnvVars } from '../orm/database-config-utils';
import { CreatedAtSubscriber } from "../orm/subscribers/created-at.subscriber";
import { UpdatedAtSubscriber } from "../orm/subscribers/updated-at.subscriber";
import { AutoGenIdClearSubscriber } from "../orm/subscribers/auto-gen-id-clear.subscriber";
import { SnakeNamingStrategy } from "typeorm-naming-strategies";

function sslConfig(envVars) {
  let config = {};

  if (envVars?.DATABASE_URL)
    config = {
      url: envVars.DATABASE_URL,
      ssl: { rejectUnauthorized: false },
    };

  if (envVars?.CA_CERT)
    config = {
      ...config,
      ...{ ssl: { rejectUnauthorized: false, ca: envVars.CA_CERT } },
    };

  return config;
}

function buildConnectionOptions(data): TypeOrmModuleOptions {
  const connectionParams = {
    database: data.PG_DB,
    port: +data.PG_PORT || 5432,
    username: data.PG_USER,
    password: data.PG_PASS,
    host: data.PG_HOST,
    connectTimeoutMS: 5000,
    extra: {
      max: 25,
    },
    ...sslConfig(data),
  };

  const entitiesDir =
    data?.NODE_ENV === 'test'
      ? [__dirname + '/../**/*.entity.ts']
      : [__dirname +  '/../**/*.entity{.js,.ts}'];

  return {
    type: 'postgres',
    ...connectionParams,
    entities: entitiesDir,
    synchronize: false,
    uuidExtension: 'pgcrypto',
    migrationsRun: false,
    migrationsTransactionMode: 'all',
    logging: data.ORM_LOGGING || false,
    migrations: [__dirname + '/../migrations/**/*{.ts,.js}'],
    namingStrategy: new SnakeNamingStrategy(),
    keepConnectionAlive: true,
    migrationsTableName: 'init_migrations',
    subscribers: [
      CreatedAtSubscriber,
      UpdatedAtSubscriber,
      AutoGenIdClearSubscriber
    ]
  };
}

function fetchConnectionOptions(type: string): TypeOrmModuleOptions {
  const data = getEnvVars();
  switch (type) {
    case 'postgres':
      return buildConnectionOptions(data);
  }
}

const ormConfig: TypeOrmModuleOptions = fetchConnectionOptions('postgres');

export { ormConfig };
export default ormConfig;
