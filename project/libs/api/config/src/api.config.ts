import { registerAs } from '@nestjs/config';
import * as Joi from 'joi';

const ENVIRONMENTS = ['development', 'production', 'stage'] as const;

type TEnvironment = typeof ENVIRONMENTS[number];

export interface IApiConfig {
  environment: string;
  port: number;
  usersServiceUrl: string;
  blogServiceUrl: string;
  fileVaultServiceUrl: string;
}

const validationSchema = Joi.object({
  environment: Joi.string().valid(...ENVIRONMENTS).required(),
  port: Joi.number().port(),
  usersServiceUrl: Joi.string().required(),
  blogServiceUrl: Joi.string().required(),
  fileVaultServiceUrl: Joi.string().required(),
});

function validateConfig(config: IApiConfig): void {
  const { error } = validationSchema.validate(config, { abortEarly: true });
  if (error) {
    throw new Error(`[Api Config Validation Error]: ${error.message}`);
  }
}

function getConfig(): IApiConfig {
  const config: IApiConfig = {
    environment: process.env.NODE_ENV as TEnvironment,
    port: parseInt(process.env.PORT, 10),
    usersServiceUrl: process.env.USERS_SERVICE_URL,
    blogServiceUrl: process.env.BLOG_SERVICE_URL,
    fileVaultServiceUrl: process.env.FILE_VAULT_SERVICE_URL,
  };

  validateConfig(config);
  return config;
}

export default registerAs('api', getConfig);
