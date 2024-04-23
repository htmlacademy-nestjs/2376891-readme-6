import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    description: 'User unique email',
    example: 'user@user.com'
  })
  public email: string;

  @ApiProperty({
    description: 'User name',
    example: 'Ivanov Keks',
  })
  public name: string;

  @ApiProperty({
    description: 'User password',
    example: 'IvanovKeks00000',
  })
  public password: string;
}
