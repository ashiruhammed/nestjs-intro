import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MetaOption } from 'src/meta-option/meta-option.entity';
import { UsersService } from 'src/users/providers/users.service';
import { Repository } from 'typeorm';
import { CreatePostDto } from './dtos/create-post.dto';
import { Post } from './posts.entity';

@Injectable()
export class PostsService {
  constructor(
    private readonly usersService: UsersService,
    @InjectRepository(Post)
    private postsRepository: Repository<Post>,
    @InjectRepository(MetaOption)
    private readonly metaOptionRepository: Repository<MetaOption>,
  ) {}

  public findById(id: number) {
    return this.postsRepository.findOne({ where: { id } });
  }

  public findAll() {
    return this.postsRepository.find();
  }

  public async deletePost(id: number) {
    console.log(id, 'ID');
    const post = await this.postsRepository.findOne({
      where: { id },
      relations: ['metaOptions'],
    });
    console.log(post, 'POST');
    if (!post) {
      throw new NotFoundException('Post not found');
    }

    const inversePost = await this.metaOptionRepository.findOne({
      where: { id: post.metaOptions.id },
      relations: ['post'],
    });

    console.log(inversePost, 'iNVERSE POST');

    await this.postsRepository.delete(id);
    await this.metaOptionRepository.delete(post.metaOptions.id);
    return { message: 'Post deleted successfully' };
  }

  public async createPost(body: CreatePostDto) {
    const post = this.postsRepository.create(body);
    return this.postsRepository.save(post);
  }
}
