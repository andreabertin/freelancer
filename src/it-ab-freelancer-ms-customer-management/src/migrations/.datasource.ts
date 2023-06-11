import ormConfig from '../configs/orm.config';
import { DataSource } from 'typeorm';
import { SnakeNamingStrategy } from "typeorm-naming-strategies";

console.log(ormConfig.migrations)

export default new DataSource({
  type: 'postgres',
  host: (<any>ormConfig).host,
  port: (<any>ormConfig).port,
  username: (<any>ormConfig).username,
  password: (<any>ormConfig).password,
  database: '' + ormConfig.database,
  entities: ormConfig.entities,
  synchronize: false,
  migrations: ormConfig.migrations,
  migrationsTableName: ormConfig.migrationsTableName,
  subscribers: ormConfig.subscribers,
  namingStrategy: new SnakeNamingStrategy(),
});
