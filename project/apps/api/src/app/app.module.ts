import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';

import { ApiConfigModule } from '@project/api-config';

import { HTTP_CLIENT_MAX_REDIRECTS, HTTP_CLIENT_TIMEOUT } from './app.constant';
import { UsersController } from './users.controller';
import { LinkPostsController } from './link-posts.controller';
import { CheckAuthGuard } from './guards/check-auth.guard';

@Module({
  imports: [
    HttpModule.register({
      timeout: HTTP_CLIENT_TIMEOUT,
      maxRedirects: HTTP_CLIENT_MAX_REDIRECTS,
    }),
    ApiConfigModule,
  ],
  controllers: [
    UsersController,
    LinkPostsController,
  ],
  providers: [CheckAuthGuard],
})
export class AppModule {}
