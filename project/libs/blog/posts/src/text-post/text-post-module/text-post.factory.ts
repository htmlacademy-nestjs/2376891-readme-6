import { Injectable } from '@nestjs/common';

import { IEntityFactory, ITextPost } from '@project/core';
import { TextPostEntity } from './text-post.entity';

@Injectable()
export class TextPostFactory implements IEntityFactory<TextPostEntity> {
  public create(entityPlainData: ITextPost): TextPostEntity {
    return new TextPostEntity(entityPlainData);
  }
}
