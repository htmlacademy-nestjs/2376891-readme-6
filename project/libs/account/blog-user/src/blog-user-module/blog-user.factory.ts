import { Injectable } from '@nestjs/common';

import { IAuthUser, IEntityFactory } from '@project/core';
import { BlogUserEntity } from './blog-user.entity';

@Injectable()
export class BlogUserFactory implements IEntityFactory<BlogUserEntity> {
  public create(entityPlainData: IAuthUser): BlogUserEntity {
    return new BlogUserEntity(entityPlainData);
  }
}
