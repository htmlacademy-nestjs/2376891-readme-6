import { Injectable } from '@nestjs/common';

import { IEntityFactory, IPhotoPost } from '@project/core';
import { PhotoPostEntity } from './photo-post.entity';

@Injectable()
export class PhotoPostFactory implements IEntityFactory<PhotoPostEntity> {
  public create(entityPlainData: IPhotoPost): PhotoPostEntity {
    return new PhotoPostEntity(entityPlainData);
  }
}
