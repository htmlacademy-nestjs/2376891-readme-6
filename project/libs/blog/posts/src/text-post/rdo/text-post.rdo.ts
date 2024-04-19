import { Expose } from 'class-transformer';

export class TextPostRdo {
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
  public name: string;

  @Expose()
  public title: string;

  @Expose()
  public text: string;

  @Expose()
  public author: string;

  @Expose()
  public originalAuthor: string;

  @Expose()
  public isRepost: string;
}
