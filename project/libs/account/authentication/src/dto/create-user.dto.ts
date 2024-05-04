import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

import { AuthenticationValidateMessage } from '../authentication-module/authentication.constant';

export class CreateUserDto {
  @ApiProperty({
    description: 'User unique email',
    example: 'user@user.com'
  })
  @IsEmail({}, {message: AuthenticationValidateMessage.EmailNotValid})
  public email: string;

  @ApiProperty({
    description: 'User name',
    example: 'Ivanov Keks',
  })
  @IsString()
  public name: string;

  @ApiProperty({
    description: 'User password',
    example: 'IvanovKeks00000',
  })
  @IsString()
  public password: string;
}
