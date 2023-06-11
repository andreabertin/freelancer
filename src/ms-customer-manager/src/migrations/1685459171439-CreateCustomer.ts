import { MigrationInterface, QueryRunner } from "typeorm";

export class Cus1685459171439 implements MigrationInterface {
  name = 'CreateCustomer1685459171439'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TABLE "customer"
                             (
                                 "id"          SERIAL            NOT NULL,
                                 "firstName"   character varying NOT NULL,
                                 "lastName"    character varying NOT NULL,
                                 "created_at"  TIMESTAMP         NOT NULL,
                                 "updated_at"  TIMESTAMP         NOT NULL,
                                 "companyName" character varying NOT NULL,
                                 "vatCode"     character varying NOT NULL,
                                 "taxCode"     character varying NOT NULL,
                                 CONSTRAINT "PK_a7a13f4cacb744524e44dfdad32" PRIMARY KEY ("id")
                             )`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "customer"`);
  }

}
