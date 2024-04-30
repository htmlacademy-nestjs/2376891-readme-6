import { ApiProperty } from '@nestjs/swagger';

export class CreatePhotoPostDto {
  @ApiProperty({
    description: 'Post tags',
    example: ['#aaa', '#bbb'],
  })
  public tags?: string[];

  @ApiProperty({
    description: 'Post photo path',
    example: '/images/post.png'
  })
  public photo: string;
}
