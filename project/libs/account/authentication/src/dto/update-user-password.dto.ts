import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length } from 'class-validator';

export class UpdateUserPasswordDto {
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
}
