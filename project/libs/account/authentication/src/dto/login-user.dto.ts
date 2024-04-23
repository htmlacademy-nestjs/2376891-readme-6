import { ApiProperty } from '@nestjs/swagger';

export class LoginUserDto {
  @ApiProperty({
    description: 'User unique email',
    example: 'user@user.com'
  })
  public email: string;

  @ApiProperty({
    description: 'User password',
    example: 'IvanovKeks00000',
  })
  public password: string;
}
