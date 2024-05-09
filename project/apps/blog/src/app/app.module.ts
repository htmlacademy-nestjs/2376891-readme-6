import { Module } from '@nestjs/common';

import {LinkPostModule, PhotoPostModule, QuotationPostModule, TextPostModule, VideoPostModule} from '@project/blog-post';
import { BlogCommentModule } from '@project/blog-comment';
import { BlogConfigModule } from '@project/blog-config';

@Module({
  imports: [
    LinkPostModule,
    PhotoPostModule,
    QuotationPostModule,
    TextPostModule,
    VideoPostModule,
    BlogConfigModule,
    BlogCommentModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
