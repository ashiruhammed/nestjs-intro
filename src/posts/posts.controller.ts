import {
  Body,
  Controller,
  Delete,
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
  public findById(@Param('id', ParseIntPipe) id: number) {
    console.log(id);
    return this.postsService.findById(id);
  }

  @ApiOperation({ summary: 'Get all posts' })
  @ApiResponse({
    status: 200,
    description: 'Posts found successfully',
  })
  @ApiResponse({
    status: 404,
    description: 'Posts not found',
  })
  @Get()
  public findAll() {
    return this.postsService.findAll();
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

  @ApiOperation({ summary: 'Delete a post' })
  @ApiResponse({
    status: 200,
    description: 'Post deleted successfully',
  })
  @ApiResponse({
    status: 404,
    description: 'Post not found',
  })
  @Delete('/:id')
  public deletePost(@Param('id', ParseIntPipe) id: number) {
    return this.postsService.deletePost(id);
  }
}
