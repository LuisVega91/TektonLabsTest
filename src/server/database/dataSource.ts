import { DataSource } from 'typeorm';
import { config } from 'dotenv';
import { ConfigService } from '@nestjs/config';
import { DatabaseTypes } from '../configuration/constants/database-types.constant';

config();
const configService = new ConfigService();

export const connectionSource = new DataSource({
  type: configService.get<DatabaseTypes>('TYPEORM_CONNECTION'),
  host: configService.get<string>('TYPEORM_HOST'),
  username: configService.get<string>('TYPEORM_USERNAME'),
  password: configService.get<string>('TYPEORM_PASSWORD'),
  database: configService.get<string>('TYPEORM_DATABASE'),
  port: Number(configService.get<string>('TYPEORM_PORT')),
  synchronize: Boolean(configService.get<string>('TYPEORM_SYNCHRONIZE')),
  logging: Boolean(configService.get<string>('TYPEORM_SYNCHRONIZE')),
  entities: [configService.get<string>('TYPEORM_ENTITIES')],
  migrations: [configService.get<string>('TYPEORM_MIGRATIONS')],
});
