import { DatabaseTypes } from './../constants/database-types.constant';
export interface DatabaseConfig {
  name: string;
  user: string;
  password: string;
  port: number;
  host: string;
  type: DatabaseTypes;
}
