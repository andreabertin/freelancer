import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateNamingConvention1686489017186 implements MigrationInterface {
    name = 'UpdateNamingConvention1686489017186'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "customer" DROP COLUMN "firstName"`);
        await queryRunner.query(`ALTER TABLE "customer" DROP COLUMN "lastName"`);
        await queryRunner.query(`ALTER TABLE "customer" DROP COLUMN "companyName"`);
        await queryRunner.query(`ALTER TABLE "customer" DROP COLUMN "vatCode"`);
        await queryRunner.query(`ALTER TABLE "customer" DROP COLUMN "taxCode"`);
        await queryRunner.query(`ALTER TABLE "customer" ADD "first_name" character varying NULL`);
        await queryRunner.query(`ALTER TABLE "customer" ADD "last_name" character varying NULL`);
        await queryRunner.query(`ALTER TABLE "customer" ADD "company_name" character varying NULL`);
        await queryRunner.query(`ALTER TABLE "customer" ADD "vat_code" character varying NULL`);
        await queryRunner.query(`ALTER TABLE "customer" ADD "tax_code" character varying NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "customer" DROP COLUMN "tax_code"`);
        await queryRunner.query(`ALTER TABLE "customer" DROP COLUMN "vat_code"`);
        await queryRunner.query(`ALTER TABLE "customer" DROP COLUMN "company_name"`);
        await queryRunner.query(`ALTER TABLE "customer" DROP COLUMN "last_name"`);
        await queryRunner.query(`ALTER TABLE "customer" DROP COLUMN "first_name"`);
        await queryRunner.query(`ALTER TABLE "customer" ADD "taxCode" character varying NULL`);
        await queryRunner.query(`ALTER TABLE "customer" ADD "vatCode" character varying NULL`);
        await queryRunner.query(`ALTER TABLE "customer" ADD "companyName" character varying NULL`);
        await queryRunner.query(`ALTER TABLE "customer" ADD "lastName" character varying NULL`);
        await queryRunner.query(`ALTER TABLE "customer" ADD "firstName" character varying NULL`);
    }

}
