import { Injectable } from '@nestjs/common';

import { BaseMemoryRepository } from '@project/data-access';

import { QuotationPostEntity } from './quotation-post.entity';
import { QuotationPostFactory } from './quotation-post.factory';

@Injectable()
export class QuotationPostRepository extends BaseMemoryRepository<QuotationPostEntity> {
  constructor(entityFactory: QuotationPostFactory) {
    super(entityFactory);
  }
}
