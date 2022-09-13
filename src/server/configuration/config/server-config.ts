import { Environment } from '../constants';
import { LoggerLevel } from '../constants';
import { ServerConfig } from '../interfaces';

export const getServerConfig = (): { server: ServerConfig } => ({
  server: {
    port: Number(process.env.PORT),
    environment: process.env.NODE_ENV as Environment,
    apiKey: process.env.API_KEY,
    jwtSecret: process.env.JWT_SECRET,
    loggerLevel: process.env.LOGGER_LEVEL as LoggerLevel,
  },
});
