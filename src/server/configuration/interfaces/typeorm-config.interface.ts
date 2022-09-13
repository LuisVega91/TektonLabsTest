export interface TypeOrmConfig {
  connection: string;
  host: string;
  username: string;
  password: string;
  database: string;
  port: number;
  synchronize: boolean;
  logging: boolean;
  entities: string;
  migrations: string;
  migrationsDir: string;
  migrationsTableName: string;
}
