import { Expose } from 'class-transformer';

export class CommentRdo {
  @Expose()
  public text: string;

  @Expose()
  public userId: string;

  @Expose()
  public postId: string;

  @Expose()
  public createdAt: Date;

  @Expose()
  public updatedAt: Date;
}
