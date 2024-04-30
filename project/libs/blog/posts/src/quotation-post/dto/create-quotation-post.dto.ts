import { ApiProperty } from '@nestjs/swagger';

export class CreateQuotationPostDto {
  @ApiProperty({
    description: 'Post tags',
    example: ['#aaa', '#bbb'],
  })
  public tags?: string[];

  @ApiProperty({
    description: 'Photo text',
    example: 'user@user.ru'
  })
  public text: string;

  @ApiProperty({
    description: 'The quotation author ID',
    example: '134ce8babd-cc30-4805-9b12-d9420398e7c5',
  })
  public quotationAuthor: string;
}
