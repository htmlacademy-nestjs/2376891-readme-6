import { Module } from '@nestjs/common';

import { VideoPostRepository } from './video-post.repository';
import { VideoPostFactory } from './video-post.factory';
import { VideoPostController } from './video-post.controller';
import { VideoPostService } from './video-post.service';
import { BlogCommentModule } from '@project/blog-comment';
import { PrismaClientModule } from '@project/blog-models';

@Module({
  imports: [BlogCommentModule, PrismaClientModule],
  controllers: [VideoPostController],
  providers: [VideoPostService, VideoPostRepository, VideoPostFactory],
  exports: [VideoPostService, VideoPostRepository],
})
export class VideoPostModule {}
