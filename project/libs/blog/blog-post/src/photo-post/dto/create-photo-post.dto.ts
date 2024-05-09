import { ApiProperty } from '@nestjs/swagger';
import { PostType } from '@project/core';
import { IsArray, IsEnum, IsNotEmpty, IsString } from 'class-validator';

export class CreatePhotoPostDto {
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
    description: 'Post photo path',
    example: '/images/post.png'
  })
  @IsString()
  @IsNotEmpty()
  public photo: string;

  @ApiProperty({
    description: 'The post author ID',
    example: '134ce8babd-cc30-4805-9b12-d9420398e7c5',
  })
  @IsString()
  @IsNotEmpty()
  public userId: string;
}
