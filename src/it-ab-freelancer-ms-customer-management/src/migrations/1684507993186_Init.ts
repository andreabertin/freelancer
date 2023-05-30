import { MigrationInterface, QueryRunner } from 'typeorm';
import fs from 'fs';
import * as dotenv from 'dotenv';
import { filePathForEnvVars } from '../orm/database-config-utils';

export class Init1684507993186 implements MigrationInterface {
  async down(queryRunner: QueryRunner): Promise<any> {
    let data: any = process.env;
    const envVarsFilePath = filePathForEnvVars(process.env.NODE_ENV);

    if (fs.existsSync(envVarsFilePath)) {
      data = { ...data, ...dotenv.parse(fs.readFileSync(envVarsFilePath)) };
    }
    if (data.PG_DB_OWNER !== 'false') {
      await queryRunner.query('CREATE EXTENSION IF NOT EXISTS pgcrypto;');
    }
  }

  up(queryRunner: QueryRunner): Promise<any> {
    return Promise.resolve(undefined);
  }
}
