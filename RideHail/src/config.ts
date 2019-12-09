import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

const { POSTGRES_USER, POSTGRES_PASSWORD, POSTGRES_DB, POSTGRES_PORT, NODE_HOST } = process.env;

const typeOrmConfig: PostgresConnectionOptions = {
    type: "postgres",
    host: NODE_HOST,
    port: parseInt(POSTGRES_PORT ? POSTGRES_PORT : '5432'),
    username: POSTGRES_USER,
    password: POSTGRES_PASSWORD,
    database: POSTGRES_DB,
    synchronize: true,
    logging: true,
    entities: [
        
    ]
};

export { typeOrmConfig };