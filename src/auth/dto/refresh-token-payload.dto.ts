import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class RefreshTokenPayloadDto {
  @ApiProperty({
    description: 'The refresh token',
    example: 'refresh-token',
  })
  @IsString()
  @IsNotEmpty()
  refreshToken: string;
}
