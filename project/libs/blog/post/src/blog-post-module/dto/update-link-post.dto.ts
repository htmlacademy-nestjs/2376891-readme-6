import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsDate, IsISO8601, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateLinkPostDto {
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
    description: 'Photo description',
    example: 'This is an amazing place!'
  })
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  public text?: string;
}
