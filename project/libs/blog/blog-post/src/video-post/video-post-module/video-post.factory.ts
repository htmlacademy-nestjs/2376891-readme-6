import { Injectable } from '@nestjs/common';

import { IEntityFactory, IVideoPost } from '@project/core';
import { VideoPostEntity } from './video-post.entity';
import { CreateVideoPostDto } from '../dto/create-video-post.dto';

@Injectable()
export class VideoPostFactory implements IEntityFactory<VideoPostEntity> {
  public create(entityPlainData: IVideoPost): VideoPostEntity {
    return new VideoPostEntity(entityPlainData);
  }

  public static createFromCreatePostDto(dto: CreateVideoPostDto): VideoPostEntity {
    const entity = new VideoPostEntity();

    for (const [key, value] of Object.entries(dto)) {
      if (value !== undefined && entity[key] !== value) {
        entity[key] = value;
      }
    }

    return entity;
  }
}
