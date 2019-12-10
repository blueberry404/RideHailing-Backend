"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { POSTGRES_USER, POSTGRES_PASSWORD, POSTGRES_DB, POSTGRES_PORT, NODE_HOST, POSTGRES_HOST } = process.env;
const typeOrmConfig = {
    type: "postgres",
    host: POSTGRES_HOST,
    port: parseInt(POSTGRES_PORT ? POSTGRES_PORT : '5432'),
    username: POSTGRES_USER,
    password: POSTGRES_PASSWORD,
    database: POSTGRES_DB,
    synchronize: true,
    logging: true,
    entities: []
};
exports.typeOrmConfig = typeOrmConfig;
