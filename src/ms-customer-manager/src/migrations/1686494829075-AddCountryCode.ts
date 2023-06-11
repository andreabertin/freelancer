import { MigrationInterface, QueryRunner } from "typeorm";

export class AddCountryCode1686494829075 implements MigrationInterface {
    name = 'AddCountryCode1686494829075'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "customer" ADD "country_code" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "customer" DROP COLUMN "country_code"`);
    }

}
