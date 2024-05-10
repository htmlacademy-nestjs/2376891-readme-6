import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

// import fileVaultConfig from './file-vault.config';
import apiConfig from './api.config';

const ENV_FILE_PATH = 'apps/api/api.env';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      load: [
        // fileVaultConfig,
        apiConfig],
      envFilePath: ENV_FILE_PATH
    }),
  ]
})
export class ApiConfigModule {}
