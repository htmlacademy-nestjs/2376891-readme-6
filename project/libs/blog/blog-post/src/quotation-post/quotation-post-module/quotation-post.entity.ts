import { Entity, IQuotationPost, IStorableEntity } from '@project/core';
import { BlogCommentEntity, BlogCommentFactory } from '@project/blog-comment';

export class QuotationPostEntity extends Entity implements IStorableEntity<IQuotationPost> {
  public originalId?: string;
  public createdAt?: Date;
  public updatedAt?: Date;
  public tags: string[];
  public text: string;
  public quotationAuthor: string;
  public userId: string;
  public originalUserId: string;
  public isRepost: boolean;
  public comments: BlogCommentEntity[];

  constructor(post?: IQuotationPost) {
    super();
    this.populate(post);
  }

  public populate(post?: IQuotationPost): void {
    if (!post) {
      return;
    }

    const { id, tags, text, quotationAuthor, userId } = post;

    this.id = id ?? '';
    this.createdAt = post.createdAt ?? new Date();
    this.updatedAt = post.updatedAt ?? new Date();
    this.tags = tags ?? [];
    this.text = text;
    this.quotationAuthor = quotationAuthor;
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

  public toPOJO(): IQuotationPost {
    return {
      id: this.id,
      originalId: this.originalId,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      tags: this.tags,
      text: this.text,
      quotationAuthor: this.quotationAuthor,
      userId: this.userId,
      originalUserId: this.originalUserId,
      isRepost: this.isRepost,
      comments: this.comments.map((commentEntity) => commentEntity.toPOJO()),
    }
  }
}
