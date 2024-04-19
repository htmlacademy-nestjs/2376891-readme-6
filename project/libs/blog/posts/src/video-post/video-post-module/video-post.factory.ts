import { Injectable } from '@nestjs/common';

import { IEntityFactory, IVideoPost } from '@project/core';
import { VideoPostEntity } from './video-post.entity';

@Injectable()
export class VideoPostFactory implements IEntityFactory<VideoPostEntity> {
  public create(entityPlainData: IVideoPost): VideoPostEntity {
    return new VideoPostEntity(entityPlainData);
  }
}
