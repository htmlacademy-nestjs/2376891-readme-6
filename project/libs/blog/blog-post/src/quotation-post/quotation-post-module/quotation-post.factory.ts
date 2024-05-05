import { Injectable } from '@nestjs/common';

import { IEntityFactory, IQuotationPost } from '@project/core';
import { QuotationPostEntity } from './quotation-post.entity';
import { CreateQuotationPostDto } from '../dto/create-quotation-post.dto';

@Injectable()
export class QuotationPostFactory implements IEntityFactory<QuotationPostEntity> {
  public create(entityPlainData: IQuotationPost): QuotationPostEntity {
    return new QuotationPostEntity(entityPlainData);
  }

  public static createFromCreatePostDto(dto: CreateQuotationPostDto): QuotationPostEntity {
    const entity = new QuotationPostEntity();

    for (const [key, value] of Object.entries(dto)) {
      if (value !== undefined && entity[key] !== value) {
        entity[key] = value;
      }
    }

    return entity;
  }
}
