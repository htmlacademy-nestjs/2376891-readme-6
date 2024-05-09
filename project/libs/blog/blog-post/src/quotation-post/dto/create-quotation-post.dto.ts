import { ApiProperty } from '@nestjs/swagger';
import { PostType } from '@project/core';
import { IsArray, IsEnum, IsNotEmpty, IsString } from 'class-validator';

export class CreateQuotationPostDto {
  @ApiProperty({
    description: 'Post tags',
    example: ['#aaa', '#bbb'],
  })
  @IsArray()
  @IsNotEmpty()
  public tags?: string[];

  @ApiProperty({
    enum: PostType,
    enumName: 'PostType',
    example: 'link',
    description: 'Post type',
  })
  @IsEnum(PostType)
  @IsNotEmpty()
  public type: PostType;

  @ApiProperty({
    description: 'Photo text',
    example: 'user@user.ru'
  })
  @IsString()
  @IsNotEmpty()
  public text: string;

  @ApiProperty({
    description: 'The quotation author',
    example: '134ce8babd-cc30-4805-9b12-d9420398e7c5',
  })
  @IsString()
  @IsNotEmpty()
  public quotationAuthor: string;

  @ApiProperty({
    description: 'The post author ID',
    example: '134ce8babd-cc30-4805-9b12-d9420398e7c5',
  })
  @IsString()
  @IsNotEmpty()
  public userId: string;
}
