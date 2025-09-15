import { ApiProperty } from '@nestjs/swagger';
import { IsJSON, IsNotEmpty } from 'class-validator';

export class CreatePostMetaOptionsDto {
  @ApiProperty({
    description: 'The meta value of the post',
    example: '{"title": "My Post", "description": "My Post Description"}',
  })
  @IsJSON()
  @IsNotEmpty()
  metaValue: string;
}
