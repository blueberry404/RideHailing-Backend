import {MigrationInterface, QueryRunner} from "typeorm";

export class ChangeToNullableColumns1576742101282 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "consumers" ALTER COLUMN "profileImageURL" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "consumers" ALTER COLUMN "pushToken" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "drivers" ALTER COLUMN "profileImageURL" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "drivers" ALTER COLUMN "pushToken" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "ride" ALTER COLUMN "endRideTime" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "ride" ALTER COLUMN "distance" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "ride" ALTER COLUMN "amountCharged" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "consumers" ALTER COLUMN "profileImageURL" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "consumers" ALTER COLUMN "pushToken" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "drivers" ALTER COLUMN "profileImageURL" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "drivers" ALTER COLUMN "pushToken" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "ride" ALTER COLUMN "endRideTime" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "ride" ALTER COLUMN "distance" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "ride" ALTER COLUMN "amountCharged" SET NOT NULL`);
    }

}
