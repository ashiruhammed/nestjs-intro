import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { PostsService } from './posts.service';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get('/:id')
  public findAll(@Param('id', ParseIntPipe) id: number) {
    return this.postsService.findAll(id);
  }
}
