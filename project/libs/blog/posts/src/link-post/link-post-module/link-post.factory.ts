import { Injectable } from '@nestjs/common';

import { IEntityFactory, ILinkPost } from '@project/core';
import { LinkPostEntity } from './link-post.entity';

@Injectable()
export class LinkPostFactory implements IEntityFactory<LinkPostEntity> {
  public create(entityPlainData: ILinkPost): LinkPostEntity {
    return new LinkPostEntity(entityPlainData);
  }
}
