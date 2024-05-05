import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsDate, IsISO8601, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateTextPostDto {
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

  @ApiProperty({
    description: 'Post text',
    example: 'This is an amazing place!'
  })
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  public text?: string;
}
