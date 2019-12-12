import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateInitialTables1576066738166 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.createTable(this.createUserTable('consumers'), true);
        await queryRunner.createTable(this.createUserTable('drivers'), true);
        await queryRunner.createTable(this.createRideTable(), true);
        await queryRunner.createTable(this.createUserLocationsTable(), true);
    }

    private createUserTable(tablename: string): Table {
        return new Table({
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
                    name: 'location',
                    type: 'simple-json'
                }
            ]
        });
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
    }

}
