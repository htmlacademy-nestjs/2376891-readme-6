import { Entity, IVideoPost, IStorableEntity } from '@project/core';
import { BlogCommentEntity, BlogCommentFactory } from '@project/blog-comment';

export class VideoPostEntity extends Entity implements IStorableEntity<IVideoPost> {
  public originalId?: string;
  public createdAt?: Date;
  public updatedAt?: Date;
  public tags: string[];
  public name: string;
  public url: string;
  public userId: string;
  public originalUserId: string;
  public isRepost: boolean;
  public comments: BlogCommentEntity[];

  constructor(post?: IVideoPost) {
    super();
    this.populate(post);
  }

  public populate(post?: IVideoPost): void {
    if (!post) {
      return;
    }

    const { id, tags, name, url: url, userId } = post;

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
    this.comments = [];

    const blogCommentFactory = new BlogCommentFactory();
    for (const comment of post.comments) {
      const blogCommentEntity = blogCommentFactory.create(comment);
      this.comments.push(blogCommentEntity);
    }
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
      comments: this.comments.map((commentEntity) => commentEntity.toPOJO()),
    }
  }
}
