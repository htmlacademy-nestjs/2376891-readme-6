import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsDate, IsISO8601, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateCommonPostDto {
  @ApiProperty({
    description: 'Post update date',
    example: '1981-03-12',
  })
  @IsDate()
  @IsISO8601()
  @IsNotEmpty()
  @IsOptional()
  public updatedAt?: Date;

  @ApiProperty({
    description: 'Post tags',
    example: ['#aaa', '#bbb'],
  })
  @IsArray()
  @IsNotEmpty()
  @IsOptional()
  public tags?: string[];

  @ApiProperty({
    description: 'Link',
    example: 'user@user.ru'
  })
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  public url?: string;

  @ApiProperty({
    description: 'Text',
    example: 'This is an amazing place!'
  })
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  public text?: string;

  @ApiProperty({
    description: 'Post photo path',
    example: '/images/post.png'
  })
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  public photo?: string;

  @ApiProperty({
    description: 'The quotation author ID',
    example: '134ce8babd-cc30-4805-9b12-d9420398e7c5',
  })
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  public quotationAuthor?: string;

  @ApiProperty({
    description: 'Post name',
    example: 'Dream house'
  })
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  public name?: string;

  @ApiProperty({
    description: 'Post announcement',
    example: 'This is an amazing place!'
  })
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  public title?: string;
}

