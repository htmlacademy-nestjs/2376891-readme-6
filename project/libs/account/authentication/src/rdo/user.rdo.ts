import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class UserRdo {
  @ApiProperty({
    description: 'The uniq user ID',
    example: '134ce8babd-cc30-4805-9b12-d9420398e7c5'
  })
  @Expose()
  public id: string;

  @ApiProperty({
    description: 'User avatar path',
    example: '/images/user.png'
  })
  @Expose()
  public avatar?: string;

  @ApiProperty({
    description: 'User email',
    example: 'user@user.com'
  })
  @Expose()
  public email: string;

  @ApiProperty({
    description: 'User name',
    example: 'Ivanov Keks',
  })
  @Expose()
  public name: string;

  @ApiProperty({
    description: 'Date of user registration',
    example: '2020-01-01',
  })
  @Expose()
  createdAt!: string;

  @ApiProperty({
    description: 'Date of user date update',
    example: '2020-01-01',
  })
  @Expose()
  updatedAt!: string;
}
