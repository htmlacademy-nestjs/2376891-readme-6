import { Module } from '@nestjs/common';

import { LinkPostModule, PhotoPostModule, QuotationPostModule, TextPostModule, VideoPostModule } from '@project/posts';
import { BlogConfigModule } from '@project/blog-config';

@Module({
  imports: [LinkPostModule, PhotoPostModule, QuotationPostModule, TextPostModule, VideoPostModule, BlogConfigModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
