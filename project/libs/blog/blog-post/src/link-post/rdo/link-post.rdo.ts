import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

import { TComment } from '@project/core';

export class LinkPostRdo {
  @ApiProperty({
    description: 'The uniq post ID',
    example: '134ce8babd-cc30-4805-9b12-d9420398e7c5',
  })
  @Expose()
  public id: string;

  @ApiProperty({
    description: 'The original post ID',
    example: '134ce8babd-cc30-4805-9b12-d9420398e7c5',
  })
  @Expose()
  public originalId: string;

  @ApiProperty({
    description: 'Post create date',
    example: '1981-03-12',
  })
  @Expose()
  // public updatedAt: string;
  public createdAt: Date;

  @ApiProperty({
    description: 'Post update date',
    example: '1981-03-12',
  })
  @Expose()
  // public updatedAt: string;
  public updatedAt: Date;

  @ApiProperty({
    description: 'Post tags',
    example: ['#aaa', '#bbb'],
  })
  @Expose()
  public tags: string[];

  @ApiProperty({
    description: 'Photo link',
    example: 'user@user.ru'
  })
  @Expose()
  public url: string;

  @ApiProperty({
    description: 'Photo description',
    example: 'This is an amazing place!'
  })
  @Expose()
  public text: string;

  @ApiProperty({
    description: 'The post author ID',
    example: '134ce8babd-cc30-4805-9b12-d9420398e7c5',
  })
  @Expose()
  public userId: string;

  @ApiProperty({
    description: 'The original post author ID',
    example: '134ce8babd-cc30-4805-9b12-d9420398e7c5',
  })
  @Expose()
  public originalUserId: string;

  @ApiProperty({
    description: 'Repost sign',
    example: true,
  })
  @Expose()
  public isRepost: string;

  @ApiProperty({
    description: 'Post comments',
    example: ['134ce8babd-cc30-4805-9b12-d9420398e7c5', '134ce8babd-cc30-4805-9b12-d9420398e7c5'],
  })
  @Expose()
  public comments: TComment[]
}