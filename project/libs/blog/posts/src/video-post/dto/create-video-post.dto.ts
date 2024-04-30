import { ApiProperty } from '@nestjs/swagger';

export class CreateVideoPostDto {
  @ApiProperty({
    description: 'Post tags',
    example: ['#aaa', '#bbb'],
  })
  public tags?: string[];

  @ApiProperty({
    description: 'Post name',
    example: 'Dream house'
  })
  public name: string;

  @ApiProperty({
    description: 'Video link',
    example: 'user@user.ru'
  })
  public url: string;
}
