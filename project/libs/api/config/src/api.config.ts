import { registerAs } from '@nestjs/config';
import * as Joi from 'joi';

// const DEFAULT_PORT = 3000;
// const DEFAULT_MONGO_PORT = 27017;
const ENVIRONMENTS = ['development', 'production', 'stage'] as const;

type TEnvironment = typeof ENVIRONMENTS[number];

export interface IApiConfig {
  environment: string;
  port: number;
  usersServiceUrl: string;
  blogServiceUrl: string;
  fileVaultServiceUrl: string;
  // httpClientMaxRedirects: number;
  // httpClientTimeout: number;
// USERS_SERVICE_URL=http://localhost:3333/api/auth
// BLOG_SERVICE_URL=http://localhost:3334/api/posts
// HTTP_CLIENT_MAX_REDIRECTS=5
// HTTP_CLIENT_TIMEOUT=3000
  // uploadDirectory: string;
  // db: {
  //   host: string;
  //   port: number;
  //   user: string;
  //   name: string;
  //   password: string;
  //   authBase: string;
  // }
}

const validationSchema = Joi.object({
  environment: Joi.string().valid(...ENVIRONMENTS).required(),
  port: Joi.number().port(),
  usersServiceUrl: Joi.string().required(),
  blogServiceUrl: Joi.string().required(),
  fileVaultServiceUrl: Joi.string().required(),
  // httpClientMaxRedirects: Joi.number().required(),
  // httpClientTimeout: Joi.number().required(),
  // port: Joi.number().port().default(DEFAULT_PORT),
  // uploadDirectory: Joi.string().required(),
  // db: Joi.object({
  //   host: Joi.string().valid().hostname(),
  //   port: Joi.number().port(),
  //   name: Joi.string().required(),
  //   user: Joi.string().required(),
  //   password: Joi.string().required(),
  //   authBase: Joi.string().required(),
  // })
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
    // httpClientMaxRedirects: parseInt(process.env.HTTP_CLIENT_MAX_REDIRECTS, 10),
    // httpClientTimeout: parseInt(process.env.HTTP_CLIENT_TIMEOUT, 10),
    // port: parseInt(process.env.PORT || `${DEFAULT_PORT}`, 10),
    // uploadDirectory: process.env.UPLOAD_DIRECTORY_PATH,
    // db: {
    //   host: process.env.MONGO_HOST,
    //   port: parseInt(process.env.MONGO_PORT ?? DEFAULT_MONGO_PORT.toString(), 10),
    //   name: process.env.MONGO_DB,
    //   user: process.env.MONGO_USER,
    //   password: process.env.MONGO_PASSWORD,
    //   authBase: process.env.MONGO_AUTH_BASE,
    // }
  };

  validateConfig(config);
  return config;
}

export default registerAs('api', getConfig);
