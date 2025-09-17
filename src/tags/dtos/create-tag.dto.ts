import { ApiProperty } from '@nestjs/swagger';
import {
  IsJSON,
  IsNotEmpty,
  IsString,
  IsUrl,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateTagDto {
  @ApiProperty({
    description: 'The name of the tag',
    example: 'Tag 1',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'The description of the tag',
    example: 'Tag 1 description',
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(500)
  description: string;

  @ApiProperty({
    description: 'The featured image URL of the tag',
    example: 'https://example.com/tag-1.jpg',
  })
  @IsUrl()
  @IsNotEmpty()
  @MaxLength(500)
  featuredImageUrl: string;

  @ApiProperty({
    description: 'The schema of the tag',
    example: '{"key": "value"}',
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @IsJSON()
  schema: string;

  @ApiProperty({
    description: 'The slug of the tag',
    example: 'tag-1',
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(500)
  slug: string;

  @ApiProperty({
    description: 'The meta title of the tag',
    example: 'Tag 1 meta title',
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(500)
  metaTitle: string;
}
