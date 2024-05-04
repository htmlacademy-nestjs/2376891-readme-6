import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsDate, IsISO8601, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdatePhotoPostDto {
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
    description: 'Post photo path',
    example: '/images/post.png'
  })
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  public photo?: string;
}
