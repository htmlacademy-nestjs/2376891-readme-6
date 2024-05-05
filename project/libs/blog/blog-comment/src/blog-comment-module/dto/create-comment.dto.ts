import { IsMongoId, IsNotEmpty, IsString } from 'class-validator';
import { BlogCommentValidateMessage } from '../blog-comment.constant';

export class CreateCommentDto {
  @IsString()
  @IsNotEmpty({ message: BlogCommentValidateMessage.TextIsEmpty })
  public text: string;

  @IsString()
  @IsMongoId({ message: BlogCommentValidateMessage.InvalidUserID })
  public userId: string;

  @IsString()
  @IsMongoId({ message: BlogCommentValidateMessage.InvalidPostID })
  public postId: string;
}
