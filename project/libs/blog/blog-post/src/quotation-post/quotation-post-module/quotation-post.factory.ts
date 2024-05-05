import { Injectable } from '@nestjs/common';

import { IEntityFactory, IQuotationPost } from '@project/core';
import { QuotationPostEntity } from './quotation-post.entity';

@Injectable()
export class QuotationPostFactory implements IEntityFactory<QuotationPostEntity> {
  public create(entityPlainData: IQuotationPost): QuotationPostEntity {
    return new QuotationPostEntity(entityPlainData);
  }
}
