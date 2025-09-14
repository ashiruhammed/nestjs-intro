import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/providers/users.service';
import { CreatePostDto } from './dtos/create-post.dto';
import { Post } from './posts.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class PostsService {
  constructor(
    private readonly usersService: UsersService,
    @InjectRepository(Post)
    private postsRepository: Repository<Post>,
  ) {}

  public findAll() {
    return [];
  }

  public createPost(body: CreatePostDto) {
    const post = this.postsRepository.create(body);
    return this.postsRepository.save(post);
  }
}
