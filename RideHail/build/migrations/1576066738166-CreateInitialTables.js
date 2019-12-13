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
const typeorm_1 = require("typeorm");
class CreateInitialTables1576066738166 {
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.createTable(this.createUserTable('consumers'), true);
            yield queryRunner.createTable(this.createUserTable('drivers'), true);
            yield queryRunner.createTable(this.createRideTable(), true);
            yield queryRunner.createTable(this.createUserLocationsTable(), true);
        });
    }
    createUserTable(tablename) {
        return new typeorm_1.Table({
            name: tablename,
            columns: [
                {
                    name: 'id',
                    type: 'int',
                    isPrimary: true,
                    isGenerated: true,
                    isNullable: false,
                },
                {
                    name: 'firstName',
                    type: 'character varying',
                    length: '50',
                },
                {
                    name: 'lastName',
                    type: 'character varying',
                    length: '50',
                },
                {
                    name: 'joinDate',
                    type: 'timestamptz'
                },
                {
                    name: 'email',
                    isUnique: true,
                    isNullable: false,
                    type: 'character varying',
                    length: '100',
                },
                {
                    name: 'passwordHash',
                    type: 'character varying',
                    length: '300',
                },
                {
                    name: 'mobile',
                    type: 'character varying',
                    length: '20',
                },
                {
                    name: 'profileImageURL',
                    type: 'character varying',
                    length: '500',
                },
                {
                    name: 'pushToken',
                    type: 'character varying',
                    length: '300',
                },
                {
                    name: 'state',
                    type: 'enum'
                }
            ]
        });
    }
    createRideTable() {
        return new typeorm_1.Table({
            name: 'ride',
            columns: [
                {
                    name: 'rideID',
                    type: 'int',
                    isPrimary: true,
                    isGenerated: true,
                    isNullable: false,
                },
                {
                    name: 'bookingDate',
                    type: 'timestamptz'
                },
                {
                    name: 'startRideTime',
                    type: 'timestamptz'
                },
                {
                    name: 'endRideTime',
                    type: 'timestamptz'
                },
                {
                    name: 'distance',
                    type: 'float8'
                },
                {
                    name: 'amountCharged',
                    type: 'float8'
                }
            ]
        });
    }
    createUserLocationsTable() {
        return new typeorm_1.Table({
            name: 'userlocations',
            columns: [
                {
                    name: 'id',
                    type: 'int',
                    isPrimary: true,
                    isGenerated: true,
                    isNullable: false,
                },
                {
                    name: 'logTime',
                    type: 'timestamptz'
                },
                {
                    name: 'location',
                    type: 'simple-json'
                }
            ]
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.dropTable('consumers');
            yield queryRunner.dropTable('drivers');
            yield queryRunner.dropTable('ride');
            yield queryRunner.dropTable('userlocations');
        });
    }
}
exports.CreateInitialTables1576066738166 = CreateInitialTables1576066738166;
