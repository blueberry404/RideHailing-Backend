"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { POSTGRES_USER, POSTGRES_PASSWORD, POSTGRES_DB, POSTGRES_PORT, POSTGRES_HOST } = process.env;
const typeOrmConfig = {
    type: "postgres",
    host: POSTGRES_HOST,
    port: parseInt(POSTGRES_PORT ? POSTGRES_PORT : '5432'),
    username: POSTGRES_USER,
    password: POSTGRES_PASSWORD,
    database: POSTGRES_DB,
    synchronize: false,
    migrationsRun: true,
    logging: true,
    entities: [
        'build/entities/**/*.js'
    ],
    migrations: [
        'build/migrations/**/*.js'
    ],
    cli: {
        migrationsDir: 'build/migrations'
    }
};
exports.typeOrmConfig = typeOrmConfig;
