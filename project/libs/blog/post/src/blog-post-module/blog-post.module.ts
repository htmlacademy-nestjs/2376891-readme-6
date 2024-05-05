import { Module } from '@nestjs/common';

import { BlogCommentModule } from '@project/blog-comment';
import { PrismaClientModule } from '@project/blog-models';

import { LinkPostController } from './controllers/link-post.controller';
import { PhotoPostController } from './controllers/photo-post.controller';
import { QuotationPostController } from './controllers/quotation-post.controller';
import { TextPostController } from './controllers/text-post.controller';
import { VideoPostController } from './controllers/video-post.controller';

import { BlogPostService } from './blog-post.service';
import { BlogPostRepository } from './blog-post.repository';
import { BlogPostFactory } from './blog-post.factory';

@Module({
  imports: [BlogCommentModule, PrismaClientModule],
  controllers: [LinkPostController, PhotoPostController, QuotationPostController, TextPostController, VideoPostController],
  providers: [BlogPostService, BlogPostRepository, BlogPostFactory],
  exports: [BlogPostService],
})
export class BlogPostModule {}
