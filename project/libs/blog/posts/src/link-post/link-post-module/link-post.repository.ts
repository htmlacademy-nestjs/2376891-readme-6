import { Injectable } from '@nestjs/common';

import { BaseMemoryRepository } from '@project/data-access';

import { LinkPostEntity } from './link-post.entity';
import { LinkPostFactory } from './link-post.factory';

@Injectable()
export class LinkPostRepository extends BaseMemoryRepository<LinkPostEntity> {
  constructor(entityFactory: LinkPostFactory) {
    super(entityFactory);
  }
}
