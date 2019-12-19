"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
class ChangeToNullableColumns1576742101282 {
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "consumers" ALTER COLUMN "profileImageURL" DROP NOT NULL`);
            yield queryRunner.query(`ALTER TABLE "consumers" ALTER COLUMN "pushToken" DROP NOT NULL`);
            yield queryRunner.query(`ALTER TABLE "drivers" ALTER COLUMN "profileImageURL" DROP NOT NULL`);
            yield queryRunner.query(`ALTER TABLE "drivers" ALTER COLUMN "pushToken" DROP NOT NULL`);
            yield queryRunner.query(`ALTER TABLE "ride" ALTER COLUMN "endRideTime" DROP NOT NULL`);
            yield queryRunner.query(`ALTER TABLE "ride" ALTER COLUMN "distance" DROP NOT NULL`);
            yield queryRunner.query(`ALTER TABLE "ride" ALTER COLUMN "amountCharged" DROP NOT NULL`);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "consumers" ALTER COLUMN "profileImageURL" SET NOT NULL`);
            yield queryRunner.query(`ALTER TABLE "consumers" ALTER COLUMN "pushToken" SET NOT NULL`);
            yield queryRunner.query(`ALTER TABLE "drivers" ALTER COLUMN "profileImageURL" SET NOT NULL`);
            yield queryRunner.query(`ALTER TABLE "drivers" ALTER COLUMN "pushToken" SET NOT NULL`);
            yield queryRunner.query(`ALTER TABLE "ride" ALTER COLUMN "endRideTime" SET NOT NULL`);
            yield queryRunner.query(`ALTER TABLE "ride" ALTER COLUMN "distance" SET NOT NULL`);
            yield queryRunner.query(`ALTER TABLE "ride" ALTER COLUMN "amountCharged" SET NOT NULL`);
        });
    }
}
exports.ChangeToNullableColumns1576742101282 = ChangeToNullableColumns1576742101282;
