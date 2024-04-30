import { Entity, IPhotoPost, IStorableEntity } from '@project/core';

export class PhotoPostEntity extends Entity implements IStorableEntity<IPhotoPost> {
  public originalId?: string;
  public createdAt: Date;
  public updatedAt: Date;
  public tags: string[];
  public photo: string;
  public userId: string;
  public originalUserId: string;
  public isRepost: boolean;

  constructor(post?: IPhotoPost) {
    super();
    this.populate(post);
  }

  public populate(post?: IPhotoPost): void {
    if (!post) {
      return;
    }

    const { id, tags, photo, userId } = post;

    this.id = id ?? '';
    this.createdAt = post.createdAt ?? new Date();
    this.updatedAt = post.updatedAt ?? new Date();
    this.tags = tags ?? [];
    this.photo = photo;
    this.userId = userId;
    this.isRepost = post.isRepost ?? false;
    this.originalId = post.originalId ?? '';
    this.originalUserId = post.originalUserId ?? '';
  }

  public toPOJO(): IPhotoPost {
    return {
      id: this.id,
      originalId: this.originalId,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      tags: this.tags,
      photo: this.photo,
      userId: this.userId,
      originalUserId: this.originalUserId,
      isRepost: this.isRepost,
    }
  }
}
