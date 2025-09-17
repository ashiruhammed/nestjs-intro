import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Tag } from './tags.entity';
import { CreateTagDto } from './dtos/create-tag.dto';

@Injectable()
export class TagService {
  constructor(
    @InjectRepository(Tag)
    private readonly tagRepository: Repository<Tag>,
  ) {}

  public async createTag(tag: CreateTagDto) {
    const newTag = this.tagRepository.create(tag);
    return this.tagRepository.save(newTag);
  }

  public async findAll() {
    return this.tagRepository.find();
  }

  public async findMultipleTags(tags: number[]) {
    return this.tagRepository.find({
      where: {
        id: In(tags),
      },
    });
  }

  public async deleteTag(id: number) {
    return this.tagRepository.delete(id);
  }
}
