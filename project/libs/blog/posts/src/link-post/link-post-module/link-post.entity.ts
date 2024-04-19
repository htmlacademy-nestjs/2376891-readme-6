import { Entity, ILinkPost, IStorableEntity } from '@project/core';

export class LinkPostEntity extends Entity implements IStorableEntity<ILinkPost> {
  public originalId?: string;
  public creationDate: Date;
  public publicationDate: Date;
  public tags: string[];
  public url: string;
  public description: string;
  public author: string;
  public originalAuthor: string;
  public isRepost: boolean;

  constructor(post?: ILinkPost) {
    super();
    this.populate(post);
  }

  public populate(post?: ILinkPost): void {
    if (!post) {
      return;
    }

    const { id, tags, url, description, author } = post;

    this.id = id ?? '';
    this.creationDate = post.creationDate ?? new Date();
    this.publicationDate = post.publicationDate ?? new Date();
    this.tags = tags ?? [];
    this.url = url;
    this.description = description;
    this.author = author;
    this.isRepost = post.isRepost ?? false;
    this.originalId = post.originalId ?? '';
    this.originalAuthor = post.originalAuthor ?? '';
  }

  public toPOJO(): ILinkPost {
    return {
      id: this.id,
      originalId: this.originalId,
      creationDate: this.creationDate,
      publicationDate: this.publicationDate,
      tags: this.tags,
      url: this.url,
      description: this.description,
      author: this.author,
      originalAuthor: this.originalAuthor,
      isRepost: this.isRepost,
    }
  }
}
