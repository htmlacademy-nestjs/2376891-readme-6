import { Entity, IQuotationPost, IStorableEntity, PostType } from '@project/core';
import { BlogCommentEntity, BlogCommentFactory } from '@project/blog-comment';

export class QuotationPostEntity extends Entity implements IStorableEntity<IQuotationPost> {
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

  public text: string;
  public quotationAuthor: string;

  constructor(post?: IQuotationPost, userId?: string) {
    super();
    this.populate(post, userId);
  }

  public populate(post?: IQuotationPost, userId?: string): void {
    if (!post) {
      return;
    }

    this.id = post.id ?? '';
    this.originalId = post.originalId ?? '';
    this.createdAt = post.createdAt ?? new Date();
    this.updatedAt = post.updatedAt ?? new Date();
    this.tags = post.tags ?? [];
    this.type = PostType.Quotation;
    this.userId = userId ?? post.userId;
    this.originalUserId = post.originalUserId ?? '';
    this.isRepost = post.isRepost ?? false;
    this.comments = [];
    this.likes = [];

    this.text = post.text;
    this.quotationAuthor = post.quotationAuthor;

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
      type: this.type,
      userId: this.userId,
      originalUserId: this.originalUserId,
      isRepost: this.isRepost,
      comments: this.comments.map((commentEntity) => commentEntity.toPOJO()),
      likes: this.likes,

      text: this.text,
      quotationAuthor: this.quotationAuthor,
    }
  }
}
