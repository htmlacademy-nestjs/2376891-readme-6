import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class UpdateUserPasswordDto {
  @ApiProperty({
    description: 'Current user password',
    example: 'IvanovKeks00000',
  })
  @IsString()
  public password!: string;

  @ApiProperty({
    description: 'New user password',
    example: 'IvanovKeks00000',
  })
  @IsString()
  public newPassword!: string;
}
