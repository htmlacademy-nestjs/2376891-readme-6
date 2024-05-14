import { Entity, ILinkPost, IStorableEntity, PostType } from '@project/core';
import { BlogCommentEntity, BlogCommentFactory } from '@project/blog-comment';

export class LinkPostEntity extends Entity implements IStorableEntity<ILinkPost> {
  public originalId?: string;
  public createdAt?: Date;
  public updatedAt?: Date;
  public tags: string[];
  public type: PostType;
  public userId: string;
  public originalUserId: string;
  public isRepost: boolean;
  public comments: BlogCommentEntity[];
  public likes: [];

  public url: string;
  public text: string;

  constructor(post?: ILinkPost, userId?: string) {
    super();
    this.populate(post, userId);
  }

  public populate(post?: ILinkPost, userId?: string): void {
    if (!post) {
      return;
    }

    this.id = post.id ?? '';
    this.originalId = post.originalId ?? '';
    this.createdAt = post.createdAt ?? new Date();
    this.updatedAt = post.updatedAt ?? new Date();
    this.tags = post.tags ?? [];
    this.type = PostType.Link;
    this.userId = userId ?? post.userId;
    this.originalUserId = post.originalUserId ?? '';
    this.isRepost = post.isRepost ?? false;
    this.comments = [];
    this.likes = [];

    this.url = post.url;
    this.text = post.text;

    const blogCommentFactory = new BlogCommentFactory();
    if (post.comments) {
      for (const comment of post.comments) {
      const blogCommentEntity = blogCommentFactory.create(comment);
      this.comments.push(blogCommentEntity);
    }
    }
  }

  public toPOJO(): ILinkPost {
    return {
      id: this.id,
      originalId: this.originalId,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      tags: this.tags,
      type: this.type,
      userId: this.userId,
      originalUserId: this.originalUserId,
      isRepost: this.isRepost,
      comments: this.comments.map((commentEntity) => commentEntity.toPOJO()),
      likes: this.likes,

      url: this.url,
      text: this.text,
    }
  }
}
