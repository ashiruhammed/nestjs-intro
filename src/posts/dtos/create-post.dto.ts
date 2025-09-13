import { PostType } from '../enums/postType';
import { PostStatus } from '../enums/postStatus';
import {
  IsString,
  IsEnum,
  IsNotEmpty,
  MinLength,
  Matches,
  IsDate,
  IsArray,
  IsObject,
  ValidateNested,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { CreatePostMetaOptionsDto } from './create-post-metaoptions.dto';

export class CreatePostDto {
  @ApiProperty({
    description: 'The title of the post',
    example: 'My Awesome Blog Post',
    minLength: 3,
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  title: string;

  @ApiProperty({
    description: 'URL-friendly slug for the post',
    example: 'my-awesome-blog-post',
    pattern: '^[a-z0-9-]+$',
  })
  @IsString()
  @IsNotEmpty()
  @Matches(/^[a-z0-9-]+$/)
  slug: string;

  @ApiProperty({
    description: 'The publication status of the post',
    enum: PostStatus,
    example: PostStatus.PUBLISHED,
  })
  @IsEnum(PostStatus)
  @IsNotEmpty()
  status: PostStatus;

  @ApiProperty({
    description: 'The main content of the post',
    example: 'This is the main content of my blog post...',
    minLength: 3,
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  content: string;

  @ApiProperty({
    description: 'The type of post',
    enum: PostType,
    example: PostType.POST,
  })
  @IsEnum(PostType)
  @IsNotEmpty()
  postType: PostType;

  @ApiProperty({
    description: 'Tags associated with the post',
    example: ['javascript', 'nestjs', 'backend'],
    type: [String],
    minItems: 1,
  })
  @IsArray()
  @IsString({ each: true })
  @IsNotEmpty()
  @MinLength(3, { each: true })
  tags: string[];

  @ApiProperty({
    description: 'The date when the post should be published',
    example: '2024-01-15T10:30:00Z',
    type: 'string',
    format: 'date-time',
  })
  @Type(() => Date)
  @IsDate()
  publishedOn: Date;

  @ApiProperty({
    description: 'Meta options for the post configuration',
    example: [{ key: 'sidebarEnabled', value: true }],
    type: 'array',
    items: {
      type: 'object',
      properties: {
        key: { type: 'string', example: 'sidebarEnabled' },
        value: { type: 'any', example: true },
      },
    },
  })
  @IsArray()
  @IsObject({ each: true })
  @ValidateNested()
  @Type(() => CreatePostMetaOptionsDto)
  metaOptions: Array<CreatePostMetaOptionsDto>;
}
