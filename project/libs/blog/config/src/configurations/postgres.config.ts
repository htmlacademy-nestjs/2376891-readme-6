import { registerAs } from '@nestjs/config';
import * as Joi from 'joi';

const DEFAULT_POSTGRES_PORT = 27017;

export interface PostgresConfig {
  host: string;
  name: string;
  port: number;
  user: string;
  password: string;
  authBase: string;
}

const dbValidationSchema = Joi.object({
  host: Joi.string().hostname().required(),
  port: Joi.number().port().default(DEFAULT_POSTGRES_PORT),
  name: Joi.string().required(),
  user: Joi.string().required(),
  password: Joi.string().required(),
  authBase: Joi.string().required(),
});

function validatePostgresConfig(config: PostgresConfig): void {
  const { error } = dbValidationSchema.validate(config, { abortEarly: true });
  if (error) {
    throw new Error(`[DB Config Validation Error]: ${error.message}`);
  }
}

function getDbConfig(): PostgresConfig {
  const config: PostgresConfig = {
    host: process.env.POSTGRES_HOST,
    name: process.env.POSTGRES_DB,
    port: parseInt(process.env.POSTGRES_PORT ?? `${DEFAULT_POSTGRES_PORT}`, 10),
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    authBase: process.env.POSTGRES_AUTH_BASE,
  };

  validatePostgresConfig(config);
  return config;
}

export default registerAs('db', getDbConfig);
