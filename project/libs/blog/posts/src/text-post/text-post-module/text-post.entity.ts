import { Entity, ITextPost, IStorableEntity } from '@project/core';

export class TextPostEntity extends Entity implements IStorableEntity<ITextPost> {
  public originalId?: string;
  public creationDate: Date;
  public publicationDate: Date;
  public tags: string[];
  public name: string;
  public title: string;
  public text: string;
  public author: string;
  public originalAuthor: string;
  public isRepost: boolean;

  constructor(post?: ITextPost) {
    super();
    this.populate(post);
  }

  public populate(post?: ITextPost): void {
    if (!post) {
      return;
    }

    const { id, tags, name, title, text, author } = post;

    this.id = id ?? '';
    this.creationDate = post.creationDate ?? new Date();
    this.publicationDate = post.publicationDate ?? new Date();
    this.tags = tags ?? [];
    this.name = name;
    this.title = title;
    this.text = text;
    this.author = author;
    this.isRepost = post.isRepost ?? false;
    this.originalId = post.originalId ?? '';
    this.originalAuthor = post.originalAuthor ?? '';
  }

  public toPOJO(): ITextPost {
    return {
      id: this.id,
      originalId: this.originalId,
      creationDate: this.creationDate,
      publicationDate: this.publicationDate,
      tags: this.tags,
      name: this.name,
      title: this.title,
      text: this.text,
      author: this.author,
      originalAuthor: this.originalAuthor,
      isRepost: this.isRepost,
    }
  }
}
