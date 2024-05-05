import { Injectable } from '@nestjs/common';

import { IEntityFactory, ICommonPost } from '@project/core';
import { BlogPostEntity } from './blog-post.entity';

@Injectable()
export class BlogPostFactory implements IEntityFactory<BlogPostEntity> {
  public create(entityPlainData: ICommonPost): BlogPostEntity {
    return new BlogPostEntity(entityPlainData);
  }

  public static createFromCreatePostDto(post: ICommonPost): BlogPostEntity {
    const entity = new BlogPostEntity();

    for (const [key, value] of Object.entries(post)) {
      if (value !== undefined && entity[key] !== value) {
        entity[key] = value;
      }
    }

    return entity;
  }
}
