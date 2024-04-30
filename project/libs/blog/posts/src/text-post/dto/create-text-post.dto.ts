import { ApiProperty } from '@nestjs/swagger';

export class CreateTextPostDto {
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
