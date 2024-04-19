import { Module } from '@nestjs/common';

import { VideoPostRepository } from './video-post.repository';
import { VideoPostFactory } from './video-post.factory';
import { VideoPostController } from './video-post.controller';
import { VideoPostService } from './video-post.service';

@Module({
  controllers: [VideoPostController],
  providers: [VideoPostService, VideoPostRepository, VideoPostFactory],
  exports: [VideoPostService, VideoPostRepository],
})
export class VideoPostModule {}
