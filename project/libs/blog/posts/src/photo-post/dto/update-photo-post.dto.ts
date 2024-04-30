import { ApiProperty } from '@nestjs/swagger';

export class UpdatePhotoPostDto {
  @ApiProperty({
    description: 'Post update date',
    example: '1981-03-12',
  })
  public updatedAt: Date;

  @ApiProperty({
    description: 'Post tags',
    example: ['#aaa', '#bbb'],
  })
  public tags: string[];

  @ApiProperty({
    description: 'Post photo path',
    example: '/images/post.png'
  })
  public photo: string;
}
