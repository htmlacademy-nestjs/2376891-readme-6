import { Injectable } from '@nestjs/common';

import { BaseMemoryRepository } from '@project/data-access';

import { TextPostEntity } from './text-post.entity';
import { TextPostFactory } from './text-post.factory';

@Injectable()
export class TextPostRepository extends BaseMemoryRepository<TextPostEntity> {
  constructor(entityFactory: TextPostFactory) {
    super(entityFactory);
  }
}
