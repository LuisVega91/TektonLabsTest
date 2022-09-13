import * as Joi from 'joi';
import { Environment, LoggerLevel } from '../constants';

export const environmentVariablesSchema = Joi.object({
  PORT: Joi.number().required().default(3000),
  NODE_ENV: Joi.string()
    .valid(...Object.values(Environment))
    .required(),
  API_KEY: Joi.string().required(),
  JWT_SECRET: Joi.string().required(),
  LOGGER_LEVEL: Joi.string()
    .valid(...Object.values(LoggerLevel))
    .required(),
  DB_NAME: Joi.string().required(),
  DB_USER: Joi.string().required(),
  DB_PASSWORD: Joi.string().required(),
  DB_PORT: Joi.number().required(),
  DB_HOST: Joi.string().required(),
  TYPEORM_CONNECTION: Joi.string().required(),
  TYPEORM_HOST: Joi.string().required(),
  TYPEORM_USERNAME: Joi.string().required(),
  TYPEORM_PASSWORD: Joi.string().required(),
  TYPEORM_DATABASE: Joi.string().required(),
  TYPEORM_PORT: Joi.number().required(),
  TYPEORM_SYNCHRONIZE: Joi.string().valid('true', 'false').required(),
  TYPEORM_LOGGING: Joi.string().valid('true', 'false').required(),
  TYPEORM_ENTITIES: Joi.string().required(),
  TYPEORM_MIGRATIONS: Joi.string().required(),
  TYPEORM_MIGRATIONS_DIR: Joi.string().required(),
  TYPEORM_MIGRATIONS_TABLE_NAME: Joi.string().required(),
});
