import { Expose } from 'class-transformer';

export class LinkPostRdo {
  @Expose()
  public id: string;

  @Expose()
  public originalId: string;

  @Expose()
  public creationDate: Date;

  @Expose()
  public publicationDate: Date;

  @Expose()
  public tags: string[];

  @Expose()
  public url: string;

  @Expose()
  public description: string;

  @Expose()
  public author: string;

  @Expose()
  public originalAuthor: string;

  @Expose()
  public isRepost: string;
}
