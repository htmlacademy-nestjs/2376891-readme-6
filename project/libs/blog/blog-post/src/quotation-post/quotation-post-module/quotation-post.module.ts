import { Module } from '@nestjs/common';

import { QuotationPostRepository } from './quotation-post.repository';
import { QuotationPostFactory } from './quotation-post.factory';
import { QuotationPostController } from './quotation-post.controller';
import { QuotationPostService } from './quotation-post.service';
import { BlogCommentModule } from '@project/blog-comment';
import { PrismaClientModule } from '@project/blog-models';

@Module({
  imports: [BlogCommentModule, PrismaClientModule],
  controllers: [QuotationPostController],
  providers: [QuotationPostService, QuotationPostRepository, QuotationPostFactory],
  exports: [QuotationPostService, QuotationPostRepository],
})
export class QuotationPostModule {}
