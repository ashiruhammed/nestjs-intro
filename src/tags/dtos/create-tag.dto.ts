import {
  IsJSON,
  IsNotEmpty,
  IsString,
  IsUrl,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateTagDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(500)
  description: string;

  @IsUrl()
  @IsNotEmpty()
  @MaxLength(500)
  featuredImageUrl: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @IsJSON()
  @IsNotEmpty()
  schema: JSON;

  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(500)
  slug: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(500)
  metaTitle: string;
}
