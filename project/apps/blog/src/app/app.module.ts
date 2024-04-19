import { Module } from '@nestjs/common';

import { LinkPostModule, PhotoPostModule, QuotationPostModule, TextPostModule, VideoPostModule } from '@project/posts';

@Module({
  imports: [LinkPostModule, PhotoPostModule, QuotationPostModule, TextPostModule, VideoPostModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
