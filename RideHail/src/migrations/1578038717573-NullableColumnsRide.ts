import {MigrationInterface, QueryRunner} from "typeorm";

export class NullableColumnsRide1578038717573 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "ride" ALTER COLUMN "startRideTime" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "ride" ALTER COLUMN "endRideTime" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "ride" ALTER COLUMN "startRideTime" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "ride" ALTER COLUMN "endRideTime" SET NOT NULL`);
    }

}
