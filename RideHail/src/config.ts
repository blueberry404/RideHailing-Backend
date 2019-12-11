import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

const { POSTGRES_USER, POSTGRES_PASSWORD, POSTGRES_DB, POSTGRES_PORT, POSTGRES_HOST } = process.env;

const typeOrmConfig: PostgresConnectionOptions = {
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
        `${__dirname}/entities/*.js`
    ],
    migrations: [
        'migrations/*.js'
    ],
    cli: {
        migrationsDir: 'migrations'
    }
};

export { typeOrmConfig };