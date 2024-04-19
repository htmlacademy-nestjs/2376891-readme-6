import { Entity, IQuotationPost, IStorableEntity } from '@project/core';

export class QuotationPostEntity extends Entity implements IStorableEntity<IQuotationPost> {
  public originalId?: string;
  public creationDate: Date;
  public publicationDate: Date;
  public tags: string[];
  public text: string;
  public quotationAuthor: string;
  public author: string;
  public originalAuthor: string;
  public isRepost: boolean;

  constructor(post?: IQuotationPost) {
    super();
    this.populate(post);
  }

  public populate(post?: IQuotationPost): void {
    if (!post) {
      return;
    }

    const { id, tags, text, quotationAuthor, quotationAuthor: author } = post;

    this.id = id ?? '';
    this.creationDate = post.creationDate ?? new Date();
    this.publicationDate = post.publicationDate ?? new Date();
    this.tags = tags ?? [];
    this.text = text;
    this.quotationAuthor = quotationAuthor;
    this.author = author;
    this.isRepost = post.isRepost ?? false;
    this.originalId = post.originalId ?? '';
    this.originalAuthor = post.originalAuthor ?? '';
  }

  public toPOJO(): IQuotationPost {
    return {
      id: this.id,
      originalId: this.originalId,
      creationDate: this.creationDate,
      publicationDate: this.publicationDate,
      tags: this.tags,
      text: this.text,
      quotationAuthor: this.quotationAuthor,
      author: this.author,
      originalAuthor: this.originalAuthor,
      isRepost: this.isRepost,
    }
  }
}
