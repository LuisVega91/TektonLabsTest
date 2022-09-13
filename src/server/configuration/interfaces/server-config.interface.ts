import { Environment } from '../constants';
import { LoggerLevel } from '../constants/log-level.constant';

export interface ServerConfig {
  port: number;
  environment: Environment;
  apiKey: string;
  jwtSecret: string;
  loggerLevel: LoggerLevel;
}
