import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsString } from 'class-validator';

export class CreateLinkPostDto {
  @ApiProperty({
    description: 'Post tags',
    example: ['#aaa', '#bbb'],
  })
  @IsArray()
  @IsNotEmpty()
  public tags?: string[];

  @ApiProperty({
    description: 'Photo link',
    example: 'user@user.ru'
  })
  @IsString()
  @IsNotEmpty()
  public url: string;

  @ApiProperty({
    description: 'Photo description',
    example: 'This is an amazing place!'
  })
  @IsString()
  @IsNotEmpty()
  public text: string;
}
