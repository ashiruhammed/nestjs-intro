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
  IsOptional,
  IsNumber,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { CreatePostMetaOptionsDto } from '../../meta-option/dtos/create-post-metaoptions.dto';

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
    example: [1, 2, 3],
    type: [String],
    minItems: 1,
  })
  @IsArray()
  @IsNotEmpty()
  tags: number[];

  @ApiProperty({
    description: 'The date when the post should be published',
    example: '2024-01-15T10:30:00Z',
    type: 'string',
    format: 'date-time',
  })
  @Type(() => Date)
  @IsDate()
  publishedOn: Date;

  @ApiPropertyOptional({
    description: 'Optional meta configuration for the post',
    type: 'object',
    properties: {
      metaValue: {
        type: 'string',
        description: 'JSON string of meta options for the post',
        example: '{"sidebarEnabled": true, "featuredImage": "image.jpg"}',
      },
    },
  })
  @IsOptional()
  @IsObject()
  @ValidateNested()
  @Type(() => CreatePostMetaOptionsDto)
  metaOptions: CreatePostMetaOptionsDto | undefined;

  @ApiProperty({
    description: 'The author of the post',
    type: 'number',
    required: true,
    example: 1,
  })
  @IsNumber()
  @IsNotEmpty()
  author: number;
}
