import { ApiProperty } from '@nestjs/swagger';

export class UpdateTextPostDto {
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
    description: 'Post name',
    example: 'Dream house'
  })
  public name: string;

  @ApiProperty({
    description: 'Post announcement',
    example: 'This is an amazing place!'
  })
  public title: string;

  @ApiProperty({
    description: 'Post text',
    example: 'This is an amazing place!'
  })
  public text: string;
}
