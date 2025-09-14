import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { CreatePostDto } from './dtos/create-post.dto';
import { PostsService } from './posts.service';

@ApiTags('Posts')
@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @ApiOperation({ summary: 'Get post by ID' })
  @ApiParam({
    name: 'id',
    description: 'The ID of the post to retrieve',
    example: 1,
  })
  @ApiResponse({
    status: 200,
    description: 'Post found successfully',
  })
  @ApiResponse({
    status: 404,
    description: 'Post not found',
  })
  @Get('/:id')
  public findAll(@Param('id', ParseIntPipe) id: number) {
    console.log(id);
    // return this.postsService.findAll(id);
  }

  @ApiOperation({ summary: 'Create a new post' })
  @ApiResponse({
    status: 201,
    description: 'Post created successfully',
    type: CreatePostDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request - validation failed',
  })
  @Post()
  public createPost(@Body() body: CreatePostDto) {
    return this.postsService.createPost(body);
  }
}
