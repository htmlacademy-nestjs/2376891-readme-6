import { Entity, ILinkPost, ICommonPost, IStorableEntity, IPhotoPost, IQuotationPost, ITextPost, IVideoPost } from '@project/core';
import { BlogCommentEntity, BlogCommentFactory } from '@project/blog-comment';

export class BlogPostEntity extends Entity implements IStorableEntity<ICommonPost> {
  public originalId?: string;
  public createdAt?: Date;
  public updatedAt?: Date;
  public tags?: string[];
  public userId: string;
  public originalUserId: string;
  public isRepost?: boolean;
  public comments: BlogCommentEntity[];
  public likes: [];

  public url?: string;
  public text?: string;
  public photo?: string;
  public quotationAuthor?: string;
  public name?: string;
  public title?: string;

  constructor(post?: ICommonPost, userId?: string) {
    super();
    this.populate(post, userId);
  }

  public populate(post?: ICommonPost, userId?: string): void {
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

    this.url = post.url;
    this.text = post.text;
    this.photo = post.photo;
    this.quotationAuthor = post.quotationAuthor;
    this.name = post.name;
    this.title = post.title;

    const blogCommentFactory = new BlogCommentFactory();
    for (const comment of post.comments) {
      const blogCommentEntity = blogCommentFactory.create(comment);
      this.comments.push(blogCommentEntity);
    }
  }

  // public toPOJO(): ICommonPost {
  //   return {
  //     id: this.id,
  //     originalId: this.originalId,
  //     createdAt: this.createdAt,
  //     updatedAt: this.updatedAt,
  //     tags: this.tags,
  //     userId: this.userId,
  //     originalUserId: this.originalUserId,
  //     isRepost: this.isRepost,
  //     comments: this.comments.map((commentEntity) => commentEntity.toPOJO()),
  //     // likes: this.likes,

  //     url: this.url,
  //     text: this.text,
  //     photo: this.photo,
  //     quotationAuthor: this.quotationAuthor,
  //     name: this.name,
  //     title: this.title,
  //   }
  // }
  public toPOJO(): ICommonPost {
    const post: ICommonPost = {};
    for (const [key, value] of Object.entries(this)) {
      if (value !== undefined && post[key] !== value) {
        post[key] = value;
      }
    }
    post.comments = this.comments.map((commentEntity) => commentEntity.toPOJO());

    return post;
    // return {
    //   id: this.id,
    //   originalId: this.originalId,
    //   createdAt: this.createdAt,
    //   updatedAt: this.updatedAt,
    //   tags: this.tags,
    //   userId: this.userId,
    //   originalUserId: this.originalUserId,
    //   isRepost: this.isRepost,
    //   comments: this.comments.map((commentEntity) => commentEntity.toPOJO()),
    //   // likes: this.likes,

    //   url: this.url,
    //   text: this.text,
    //   photo: this.photo,
    //   quotationAuthor: this.quotationAuthor,
    //   name: this.name,
    //   title: this.title,
    // }
  }

  public toLinkPOJO(): ILinkPost {
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

      url: this.url,
      text: this.text,
    }
  }

  public toPhotoPOJO(): IPhotoPost {
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

      photo: this.photo,
    }
  }

  public toQuotationPOJO(): IQuotationPost {
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

      text: this.text,
      quotationAuthor: this.quotationAuthor,
    }
  }

  public toTextPOJO(): ITextPost {
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

  public toVideoPOJO(): IVideoPost {
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

      url: this.url,
      name: this.name,
    }
  }
}
