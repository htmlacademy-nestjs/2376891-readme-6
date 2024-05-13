import { registerAs } from '@nestjs/config';
import * as Joi from 'joi';

const DEFAULT_PORT = 3000;
const ENVIRONMENTS = ['development', 'production', 'stage'] as const;

type TEnvironment = typeof ENVIRONMENTS[number];

export interface IApplicationConfig {
  environment: string;
  port: number;
}

const validationSchema = Joi.object({
  environment: Joi.string().valid(...ENVIRONMENTS).required(),
  port: Joi.number().port().default(DEFAULT_PORT),
});

function validateConfig(config: IApplicationConfig): void {
  const { error } = validationSchema.validate(config, { abortEarly: true });
  if (error) {
    throw new Error(`[Application Config Validation Error]: ${error.message}`);
  }
}

function getConfig(): IApplicationConfig {
  const config: IApplicationConfig = {
    environment: process.env.NODE_ENV as TEnvironment,
    port: parseInt(process.env.PORT || `${DEFAULT_PORT}`, 10),
  };

  validateConfig(config);
  return config;
}

export default registerAs('application', getConfig);
