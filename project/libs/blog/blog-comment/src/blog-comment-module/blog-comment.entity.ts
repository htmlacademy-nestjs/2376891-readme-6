import { TComment, Entity, IStorableEntity } from '@project/core';

export class BlogCommentEntity extends Entity implements IStorableEntity<TComment> {
  public createdAt?: Date;
  public updatedAt?: Date;
  public postId?: string;
  public text: string;
  public userId?: string;

  constructor(comment?: TComment) {
    super();
    this.populate(comment);
  }

  public populate(comment?: TComment): void {
    if (! comment) {
      return;
    }

    this.id = comment.id ?? undefined;
    this.createdAt = comment.createdAt ?? undefined;
    this.updatedAt = comment.updatedAt ?? undefined;
    this.text = comment.text;
    this.postId = comment.postId ?? undefined;
    this.userId = comment.userId;
  }

  public toPOJO(): TComment {
    return {
      id: this.id,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      text: this.text,
      postId: this.postId,
      userId: this.userId,
    }
  }
}
