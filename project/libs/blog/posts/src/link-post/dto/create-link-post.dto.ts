import { ApiProperty } from '@nestjs/swagger';

export class CreateLinkPostDto {
  @ApiProperty({
    description: 'Post tags',
    example: ['#aaa', '#bbb'],
  })
  public tags?: string[];

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
