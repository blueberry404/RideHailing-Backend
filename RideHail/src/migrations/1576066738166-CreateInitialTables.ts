import {MigrationInterface, QueryRunner, Table} from "typeorm";
import { ConsumerState } from '../enums/ConsumerState';
import { DriverState } from '../enums/DriverState';
import { TableColumnOptions } from "typeorm/schema-builder/options/TableColumnOptions";

export class CreateInitialTables1576066738166 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.createTable(this.createConsumersTable(), true);
        await queryRunner.createTable(this.createDriversTable(), true);
        await queryRunner.createTable(this.createRideTable(), true);
        await queryRunner.createTable(this.createUserLocationsTable(), true);
    }

    private createConsumersTable(): Table {
        return new Table({
            name: 'consumers',
            columns: [
                ...this.getCommonAttrs(),
                {
                    name: 'state',
                    type: 'enum',
                    enum: ['IDLE', 'FINDING_RIDE', 'WAIT_FOR_RIDE', 'IN_RIDE', 'FINISHED']
                },
            ]
        });
    }

    private createDriversTable(): Table {
        return new Table({
            name: 'drivers',
            columns: [
                ...this.getCommonAttrs(),
                {
                    name: 'state',
                    type: 'enum',
                    enum: ['NOT_AVAILABLE', 'IDLE', 'BUSY']
                },
                {
                    name: 'location',
                    type: 'json',
                    isNullable: true,
                },
            ],
        });
    }

    private getCommonAttrs() : Array<TableColumnOptions> {
        return [
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
                isNullable: true
            },
            {
                name: 'pushToken',
                type: 'character varying',
                length: '300',
                isNullable: true
            },
        ];
    }

    private createRideTable() : Table {
        return new Table({
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
                    type: 'timestamptz',
                    isNullable: true
                },
                {
                    name: 'endRideTime',
                    type: 'timestamptz',
                    isNullable: true
                },
                {
                    name: 'distance',
                    type: 'float8',
                    isNullable: true
                },
                {
                    name: 'amountCharged',
                    type: 'float8',
                    isNullable: true
                },
                {
                    name: 'sourceLocation',
                    type: 'json',
                    isNullable: true
                },
                {
                    name: 'destLocation',
                    type: 'json',
                    isNullable: true
                },
                {
                    name: 'isCancelled',
                    type: 'boolean',
                },
            ]
        });
    }

    private createUserLocationsTable() : Table {
        return new Table({
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
                    name: 'sourceLocation',
                    type: 'json'
                },
                {
                    name: 'destLocation',
                    type: 'json'
                },
                {
                    name: 'isCancelled',
                    type: 'json'
                },
                {
                    name: 'location',
                    type: 'json'
                }
            ]
        });
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.dropTable('consumers');
        await queryRunner.dropTable('drivers');
        await queryRunner.dropTable('ride');
        await queryRunner.dropTable('userlocations');
    }

}
