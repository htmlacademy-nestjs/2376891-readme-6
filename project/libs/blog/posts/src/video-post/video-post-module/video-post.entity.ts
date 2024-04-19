import { Entity, IVideoPost, IStorableEntity } from '@project/core';

export class VideoPostEntity extends Entity implements IStorableEntity<IVideoPost> {
  public originalId?: string;
  public creationDate: Date;
  public publicationDate: Date;
  public tags: string[];
  public name: string;
  public url: string;
  public author: string;
  public originalAuthor: string;
  public isRepost: boolean;

  constructor(post?: IVideoPost) {
    super();
    this.populate(post);
  }

  public populate(post?: IVideoPost): void {
    if (!post) {
      return;
    }

    const { id, tags, name, url, author } = post;

    this.id = id ?? '';
    this.creationDate = post.creationDate ?? new Date();
    this.publicationDate = post.publicationDate ?? new Date();
    this.tags = tags ?? [];
    this.name = name;
    this.url = url;
    this.author = author;
    this.isRepost = post.isRepost ?? false;
    this.originalId = post.originalId ?? '';
    this.originalAuthor = post.originalAuthor ?? '';
  }

  public toPOJO(): IVideoPost {
    return {
      id: this.id,
      originalId: this.originalId,
      creationDate: this.creationDate,
      publicationDate: this.publicationDate,
      tags: this.tags,
      name: this.name,
      url: this.url,
      author: this.author,
      originalAuthor: this.originalAuthor,
      isRepost: this.isRepost,
    }
  }
}
