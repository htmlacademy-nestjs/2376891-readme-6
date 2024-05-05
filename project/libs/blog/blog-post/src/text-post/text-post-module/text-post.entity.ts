import { Entity, ITextPost, IStorableEntity } from '@project/core';
import { BlogCommentEntity, BlogCommentFactory } from '@project/blog-comment';

export class TextPostEntity extends Entity implements IStorableEntity<ITextPost> {
  public originalId?: string;
  public createdAt?: Date;
  public updatedAt?: Date;
  public tags: string[];
  public userId: string;
  public originalUserId: string;
  public isRepost: boolean;
  public comments: BlogCommentEntity[];
  public likes: [];

  public name: string;
  public title: string;
  public text: string;

  constructor(post?: ITextPost, userId?: string) {
    super();
    this.populate(post, userId);
  }

  public populate(post?: ITextPost, userId?: string): void {
    if (!post) {
      return;
    }

    this.id = post.id ?? '';
    this.originalId = post.originalId ?? '';
    this.createdAt = post.createdAt ?? new Date();
    this.updatedAt = post.updatedAt ?? new Date();
    this.tags = post.tags ?? [];
    this.userId = userId ?? post.userId;
    this.originalUserId = post.originalUserId ?? '';
    this.isRepost = post.isRepost ?? false;
    this.comments = [];
    // this.likes = [];

    this.name = post.name;
    this.title = post.title;
    this.text = post.text;

    const blogCommentFactory = new BlogCommentFactory();
    for (const comment of post.comments) {
      const blogCommentEntity = blogCommentFactory.create(comment);
      this.comments.push(blogCommentEntity);
    }
  }

  public toPOJO(): ITextPost {
    return {
      id: this.id,
      originalId: this.originalId,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      tags: this.tags,
      userId: this.userId,
      originalUserId: this.originalUserId,
      isRepost: this.isRepost,
      comments: this.comments.map((commentEntity) => commentEntity.toPOJO()),
      // likes: this.likes,

      name: this.name,
      title: this.title,
      text: this.text,
    }
  }
}
