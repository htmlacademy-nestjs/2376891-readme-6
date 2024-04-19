import { Injectable } from '@nestjs/common';

import { BaseMemoryRepository } from '@project/data-access';

import { VideoPostEntity } from './video-post.entity';
import { VideoPostFactory } from './video-post.factory';

@Injectable()
export class VideoPostRepository extends BaseMemoryRepository<VideoPostEntity> {
  constructor(entityFactory: VideoPostFactory) {
    super(entityFactory);
  }
}
