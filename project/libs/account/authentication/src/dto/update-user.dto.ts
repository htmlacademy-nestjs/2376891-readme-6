import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, IsUUID } from 'class-validator';

import { AuthenticationValidateMessage } from '../authentication-module/authentication.constant';

export class UpdateUserDto {
  @ApiProperty({
    description: 'User unique email',
    example: 'user@user.com'
  })
  @IsEmail({}, {message: AuthenticationValidateMessage.EmailNotValid})
  public email?: string;

  @ApiProperty({
    description: 'User name',
    example: 'Ivanov Keks',
  })
  @IsString()
  public name?: string;

  @ApiProperty({
    description: 'User avatar ID',
    example: 'c3c05894-c1a9-422d-8752-4dc83b27b7b3',
  })
  @IsUUID()
  public avatarId?: string;
}
