import {MigrationInterface, QueryRunner, TableForeignKey, TableColumn, Table} from "typeorm";

export class AddForeignKeyConstraints1578031350538 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {

        await queryRunner.addColumn("userlocations", new TableColumn({
            name: "rideId",
            type: "int"
        }));

        await queryRunner.createForeignKey("userlocations", new TableForeignKey({
            columnNames: ["rideId"],
            referencedColumnNames: ["rideID"],
            referencedTableName: "ride"
        }));

        await queryRunner.addColumns("ride", [
            new TableColumn({
                name: 'consumerId',
                type: 'int'
            }),
            new TableColumn({
                name: 'driverId',
                type: 'int',
                isNullable: true
            })
        ]);

        await queryRunner.createForeignKey("ride", new TableForeignKey({
            columnNames: ["consumerId"],
            referencedColumnNames: ["id"],
            referencedTableName: "consumers"
        }));

        await queryRunner.createForeignKey("ride", new TableForeignKey({
            columnNames: ["driverId"],
            referencedColumnNames: ["id"],
            referencedTableName: "drivers"
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        const rideTable = await queryRunner.getTable("ride");
        if(rideTable) {
            await this.findAndRemoveFK(rideTable, queryRunner, "consumerId");
        }
     
        const userLocationTable = await queryRunner.getTable("userlocations");
        if(userLocationTable) {
            await this.findAndRemoveFK(userLocationTable, queryRunner, "driverId");
            await this.findAndRemoveFK(userLocationTable, queryRunner, "consumerId");
        }
    }

    private async findAndRemoveFK(table: Table, queryRunner: QueryRunner, foreignKeyName: string) {
        const foreignKey = table.foreignKeys.find(fk => fk.columnNames.indexOf(foreignKeyName) !== -1);
        if (foreignKey)
            await queryRunner.dropForeignKey(table, foreignKey);
    }
}
