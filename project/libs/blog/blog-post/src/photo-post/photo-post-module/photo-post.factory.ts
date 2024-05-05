import { Injectable } from '@nestjs/common';

import { IEntityFactory, IPhotoPost } from '@project/core';
import { PhotoPostEntity } from './photo-post.entity';
import { CreatePhotoPostDto } from '../dto/create-photo-post.dto';

@Injectable()
export class PhotoPostFactory implements IEntityFactory<PhotoPostEntity> {
  public create(entityPlainData: IPhotoPost): PhotoPostEntity {
    return new PhotoPostEntity(entityPlainData);
  }

  public static createFromCreatePostDto(dto: CreatePhotoPostDto): PhotoPostEntity {
    const entity = new PhotoPostEntity();

    for (const [key, value] of Object.entries(dto)) {
      if (value !== undefined && entity[key] !== value) {
        entity[key] = value;
      }
    }

    return entity;
  }
}
