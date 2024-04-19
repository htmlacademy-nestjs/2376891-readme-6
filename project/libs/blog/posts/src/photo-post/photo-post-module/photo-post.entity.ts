import { Entity, IPhotoPost, IStorableEntity } from '@project/core';

export class PhotoPostEntity extends Entity implements IStorableEntity<IPhotoPost> {
  public originalId?: string;
  public creationDate: Date;
  public publicationDate: Date;
  public tags: string[];
  public photo: string;
  public author: string;
  public originalAuthor: string;
  public isRepost: boolean;

  constructor(post?: IPhotoPost) {
    super();
    this.populate(post);
  }

  public populate(post?: IPhotoPost): void {
    if (!post) {
      return;
    }

    const { id, tags, photo, author } = post;

    this.id = id ?? '';
    this.creationDate = post.creationDate ?? new Date();
    this.publicationDate = post.publicationDate ?? new Date();
    this.tags = tags ?? [];
    this.photo = photo;
    this.author = author;
    this.isRepost = post.isRepost ?? false;
    this.originalId = post.originalId ?? '';
    this.originalAuthor = post.originalAuthor ?? '';
  }

  public toPOJO(): IPhotoPost {
    return {
      id: this.id,
      originalId: this.originalId,
      creationDate: this.creationDate,
      publicationDate: this.publicationDate,
      tags: this.tags,
      photo: this.photo,
      author: this.author,
      originalAuthor: this.originalAuthor,
      isRepost: this.isRepost,
    }
  }
}
