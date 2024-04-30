import { ApiProperty } from '@nestjs/swagger';

export class UpdateLinkPostDto {
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
    description: 'Photo link',
    example: 'user@user.ru'
  })
  public url: string;

  @ApiProperty({
    description: 'Photo description',
    example: 'This is an amazing place!'
  })
  public description: string;
}
