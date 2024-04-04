import { IAuthUser, IEntityFactory } from '@project/core';
import { BlogUserEntity } from './blog-user.entity';

export class BlogUserFactory implements IEntityFactory<BlogUserEntity> {
  public create(entityPlainData: IAuthUser): BlogUserEntity {
    return new BlogUserEntity(entityPlainData);
  }
}
