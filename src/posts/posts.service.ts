import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/providers/users.service';
import { CreatePostDto } from './dtos/create-post.dto';

@Injectable()
export class PostsService {
  constructor(private readonly usersService: UsersService) {}

  public findAll(id: number) {
    return [
      {
        user: this.usersService.findUserById(id),
        posts: [
          {
            title: 'Post 1',
            content: 'Content 1',
          },
        ],
      },
      {
        user: this.usersService.findUserById(id),
        posts: [
          {
            title: 'Post 2',
            content: 'Content 2',
          },
        ],
      },
    ];
  }

  public createPost(body: CreatePostDto) {
    return body;
  }
}
