import { Injectable } from '@nestjs/common';

import { TComment, IEntityFactory } from '@project/core';
import { BlogCommentEntity } from './blog-comment.entity';
import { CreateCommentDto } from './dto/create-comment.dto';

@Injectable()
export class BlogCommentFactory implements IEntityFactory<BlogCommentEntity> {
  public create(entityPlainData: TComment): BlogCommentEntity {
    return new BlogCommentEntity(entityPlainData);
  }

  public createFromDto(dto: CreateCommentDto, postId: string): BlogCommentEntity {
    const currentDate = new Date();
    return new BlogCommentEntity({
      ...dto,
      postId,
      createdAt: currentDate,
      updatedAt: currentDate,
    });
  }
}
