import { Module } from '@nestjs/common';

import { TextPostRepository } from './text-post.repository';
import { TextPostFactory } from './text-post.factory';
import { TextPostController } from './text-post.controller';
import { TextPostService } from './text-post.service';
import { BlogCommentModule } from '@project/blog-comment';
import { PrismaClientModule } from '@project/blog-models';

@Module({
  imports: [BlogCommentModule, PrismaClientModule],
  controllers: [TextPostController],
  providers: [TextPostService, TextPostRepository, TextPostFactory],
  exports: [TextPostService, TextPostRepository],
})
export class TextPostModule {}
