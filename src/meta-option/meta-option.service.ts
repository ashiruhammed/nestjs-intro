import { Injectable } from '@nestjs/common';
import { MetaOption } from './meta-option.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreatePostMetaOptionsDto } from './dtos/create-post-metaoptions.dto';

@Injectable()
export class MetaOptionService {
  constructor(
    @InjectRepository(MetaOption)
    private readonly metaOptionRepository: Repository<MetaOption>,
  ) {}

  public async create(createMetaOption: CreatePostMetaOptionsDto) {
    const metaOption = this.metaOptionRepository.create(createMetaOption);
    return this.metaOptionRepository.save(metaOption);
  }

  async findAll() {
    return this.metaOptionRepository.find();
  }
}
