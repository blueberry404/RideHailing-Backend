import {MigrationInterface, QueryRunner} from "typeorm";

export class AddLocationColumnToDriver1576828854734 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "drivers" ADD COLUMN "location" JSON`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "drivers" DROP COLUMN "location"`);
    }
}
