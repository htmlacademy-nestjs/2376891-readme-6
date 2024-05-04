import { Module } from '@nestjs/common';

import { LinkPostController } from './link-post.controller';
import { LinkPostService } from './link-post.service';
import { LinkPostRepository } from './link-post.repository';
import { LinkPostFactory } from './link-post.factory';
import { BlogCommentModule } from '@project/blog-comment';
import { PrismaClientModule } from '@project/blog-models';

@Module({
  imports: [BlogCommentModule, PrismaClientModule],
  controllers: [LinkPostController],
  providers: [LinkPostService, LinkPostRepository, LinkPostFactory],
  exports: [LinkPostService, LinkPostRepository],
})
export class LinkPostModule {}
