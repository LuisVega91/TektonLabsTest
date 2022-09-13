import { DatabaseTypes } from './../constants/database-types.constant';
import { DatabaseConfig } from '../interfaces';

export const getDatabaseConfig = (): { database: DatabaseConfig } => ({
  database: {
    name: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    port: Number(process.env.DB_PORT),
    host: process.env.DB_HOST,
    type: process.env.DB_TYPE as DatabaseTypes,
  },
});
