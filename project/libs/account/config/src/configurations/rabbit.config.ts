import { registerAs } from '@nestjs/config';
import * as Joi from 'joi';

const DEFAULT_RABBIT_PORT = 5672;

export interface IRabbitConfig {
  host: string;
  password: string;
  user: string;
  queue: string;
  exchange: string;
  port: number;
}

const validationSchema = Joi.object({
  host: Joi.string().valid().hostname().required(),
  password: Joi.string().required(),
  port: Joi.number().port().default(DEFAULT_RABBIT_PORT),
  user: Joi.string().required(),
  queue: Joi.string().required(),
  exchange: Joi.string().required(),
});

function validateConfig(config: IRabbitConfig): void {
  console.log(2);
  const { error } = validationSchema.validate(config, { abortEarly: true });
  if (error) {
    console.log(5);
    throw new Error(`[Rabbit Config Validation Error]: ${error.message}`);
  }
  console.log(6);
}

function getConfig(): IRabbitConfig {
  console.log(1);
  const config: IRabbitConfig = {
    host: process.env.RABBIT_HOST,
    password: process.env.RABBIT_PASSWORD,
    port: parseInt(process.env.RABBIT_PORT ?? DEFAULT_RABBIT_PORT.toString(), 10),
    user: process.env.RABBIT_USER,
    queue: process.env.RABBIT_QUEUE,
    exchange: process.env.RABBIT_EXCHANGE,
  };
  console.log(4);
  console.log(config);

  validateConfig(config);
  return config;
}

export default registerAs('rabbit', getConfig);
