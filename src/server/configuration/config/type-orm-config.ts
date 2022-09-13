import { TypeOrmConfig } from '../interfaces';

export const getTypeOrmConfig = (): { typeOrm: TypeOrmConfig } => ({
  typeOrm: {
    connection: process.env.TYPEORM_CONNECTION,
    host: process.env.TYPEORM_HOST,
    username: process.env.TYPEORM_USERNAME,
    password: process.env.TYPEORM_PASSWORD,
    database: process.env.TYPEORM_DATABASE,
    port: Number(process.env.TYPEORM_PORT),
    synchronize: Boolean(process.env.TYPEORM_SYNCHRONIZE),
    logging: Boolean(process.env.TYPEORM_LOGGING),
    entities: process.env.TYPEORM_ENTITIES,
    migrations: process.env.TYPEORM_MIGRATIONS,
    migrationsDir: process.env.TYPEORM_MIGRATIONS_DIR,
    migrationsTableName: process.env.TYPEORM_MIGRATIONS_TABLE_NAME,
  },
});
