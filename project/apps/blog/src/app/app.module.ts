import { Module } from '@nestjs/common';

import {
  // LinkPostModule, PhotoPostModule, QuotationPostModule, TextPostModule, VideoPostModule,
  BlogPostModule,
 } from '@project/post';
import { BlogCommentModule } from '@project/blog-comment';
import { BlogConfigModule } from '@project/blog-config';

@Module({
  imports: [
    // LinkPostModule,
    // PhotoPostModule,
    // QuotationPostModule,
    // TextPostModule,
    // VideoPostModule,
    BlogPostModule,
    BlogConfigModule,
    BlogCommentModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
