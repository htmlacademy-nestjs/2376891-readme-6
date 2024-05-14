import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString, IsUUID, Length } from 'class-validator';
import { AuthenticationValidateMessage } from '../authentication-module/authentication.constant';

export class UpdateUserPasswordWithUserIdDto {
  @ApiProperty({
    description: 'User unique email',
    example: 'user@user.com'
  })
  @IsEmail({}, {message: AuthenticationValidateMessage.EmailNotValid})
  @IsOptional()
  public email?: string;

  @ApiProperty({
    description: 'Current user password',
    example: 'IvanovKeks00000',
  })
  @IsString()
  @Length(6, 12)
  public password!: string;

  @ApiProperty({
    description: 'New user password',
    example: 'IvanovKeks00000',
  })
  @IsString()
  @Length(6, 12)
  public newPassword!: string;

  @ApiProperty({
    description: 'User ID',
    example: '134ce8babd-cc30-4805-9b12-d9420398e7c5',
  })
  @IsString()
  @IsUUID()
  @IsOptional()
  public userId: string;
}
