import { Entity, ILinkPost, IStorableEntity } from '@project/core';

export class LinkPostEntity extends Entity implements IStorableEntity<ILinkPost> {
  public originalId?: string;
  public createdAt: Date;
  public updatedAt: Date;
  public tags: string[];
  public url: string;
  public description: string;
  public userId: string;
  public originalUserId: string;
  public isRepost: boolean;

  constructor(post?: ILinkPost) {
    super();
    this.populate(post);
  }

  public populate(post?: ILinkPost): void {
    if (!post) {
      return;
    }

    const { id, tags, url, description, userId } = post;

    this.id = id ?? '';
    this.createdAt = post.createdAt ?? new Date();
    this.updatedAt = post.updatedAt ?? new Date();
    this.tags = tags ?? [];
    this.url = url;
    this.description = description;
    this.userId = userId;
    this.isRepost = post.isRepost ?? false;
    this.originalId = post.originalId ?? '';
    this.originalUserId = post.originalUserId ?? '';
  }

  public toPOJO(): ILinkPost {
    return {
      id: this.id,
      originalId: this.originalId,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      tags: this.tags,
      url: this.url,
      description: this.description,
      userId: this.userId,
      originalUserId: this.originalUserId,
      isRepost: this.isRepost,
    }
  }
}
