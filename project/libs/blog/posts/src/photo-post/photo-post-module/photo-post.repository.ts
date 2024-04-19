import { Injectable } from '@nestjs/common';

import { BaseMemoryRepository } from '@project/data-access';

import { PhotoPostEntity } from './photo-post.entity';
import { PhotoPostFactory } from './photo-post.factory';

@Injectable()
export class PhotoPostRepository extends BaseMemoryRepository<PhotoPostEntity> {
  constructor(entityFactory: PhotoPostFactory) {
    super(entityFactory);
  }
}
