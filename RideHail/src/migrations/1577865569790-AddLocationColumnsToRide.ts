import {MigrationInterface, QueryRunner} from "typeorm";

export class AddLocationColumnsToRide1577865569790 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "ride" ADD COLUMN "sourceLocation" JSON`);
        await queryRunner.query(`ALTER TABLE "ride" ADD COLUMN "destLocation" JSON`);
        await queryRunner.query(`ALTER TABLE "ride" ADD COLUMN "isCancelled" BOOLEAN DEFAULT FALSE`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "ride" DROP COLUMN "sourceLocation"`);
        await queryRunner.query(`ALTER TABLE "ride" DROP COLUMN "destLocation"`);
        await queryRunner.query(`ALTER TABLE "ride" DROP COLUMN "isCancelled"`);
    }
}
