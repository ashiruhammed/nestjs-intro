import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MetaOption } from 'src/meta-option/meta-option.entity';
import { UsersService } from 'src/users/providers/users.service';
import { Repository } from 'typeorm';
import { CreatePostDto } from './dtos/create-post.dto';
import { Post } from './posts.entity';
import { TagService } from 'src/tags/tag.service';

@Injectable()
export class PostsService {
  constructor(
    private readonly usersService: UsersService,
    @InjectRepository(Post)
    private postsRepository: Repository<Post>,
    @InjectRepository(MetaOption)
    private readonly metaOptionRepository: Repository<MetaOption>,
    private readonly tagService: TagService,
  ) {}

  public findById(id: number) {
    return this.postsRepository.findOne({ where: { id } });
  }

  public findAll() {
    return this.postsRepository.find({
      relations: ['author', 'metaOptions'],
    });
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
    const author = await this.usersService.findById(body.author);
    if (!author) {
      throw new NotFoundException('Author not found');
    }

    const tags = await this.tagService.findMultipleTags(body.tags);
    if (!tags) {
      throw new NotFoundException('Tags not found');
    }

    const post = this.postsRepository.create({
      ...body,
      author,
      tags,
    });
    return this.postsRepository.save(post);
  }
}
