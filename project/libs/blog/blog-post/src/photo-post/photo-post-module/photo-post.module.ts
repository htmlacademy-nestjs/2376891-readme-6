import { Module } from '@nestjs/common';

import { PhotoPostRepository } from './photo-post.repository';
import { PhotoPostFactory } from './photo-post.factory';
import { PhotoPostController } from './photo-post.controller';
import { PhotoPostService } from './photo-post.service';

@Module({
  controllers: [PhotoPostController],
  providers: [PhotoPostService, PhotoPostRepository, PhotoPostFactory],
  exports: [PhotoPostService, PhotoPostRepository],
})
export class PhotoPostModule {}
