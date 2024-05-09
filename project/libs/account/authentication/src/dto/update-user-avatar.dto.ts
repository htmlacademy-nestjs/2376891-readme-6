import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';

export class UpdateUserAvatarDto {
  @ApiProperty({
    description: 'User avatar ID',
    example: 'c3c05894-c1a9-422d-8752-4dc83b27b7b3',
  })
  @IsUUID()
  public avatarId?: string;
}
