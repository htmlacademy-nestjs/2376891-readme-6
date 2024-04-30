import { Entity, IVideoPost, IStorableEntity } from '@project/core';

export class VideoPostEntity extends Entity implements IStorableEntity<IVideoPost> {
  public originalId?: string;
  public createdAt: Date;
  public updatedAt: Date;
  public tags: string[];
  public name: string;
  public url: string;
  public userId: string;
  public originalUserId: string;
  public isRepost: boolean;

  constructor(post?: IVideoPost) {
    super();
    this.populate(post);
  }

  public populate(post?: IVideoPost): void {
    if (!post) {
      return;
    }

    const { id, tags, name, url, userId } = post;

    this.id = id ?? '';
    this.createdAt = post.createdAt ?? new Date();
    this.updatedAt = post.updatedAt ?? new Date();
    this.tags = tags ?? [];
    this.name = name;
    this.url = url;
    this.userId = userId;
    this.isRepost = post.isRepost ?? false;
    this.originalId = post.originalId ?? '';
    this.originalUserId = post.originalUserId ?? '';
  }

  public toPOJO(): IVideoPost {
    return {
      id: this.id,
      originalId: this.originalId,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      tags: this.tags,
      name: this.name,
      url: this.url,
      userId: this.userId,
      originalUserId: this.originalUserId,
      isRepost: this.isRepost,
    }
  }
}
