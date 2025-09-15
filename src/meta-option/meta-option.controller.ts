import { Controller, Post } from '@nestjs/common';
import { Body } from '@nestjs/common';
import { MetaOptionService } from './meta-option.service';
import { CreatePostMetaOptionsDto } from './dtos/create-post-metaoptions.dto';

@Controller('meta-option')
export class MetaOptionController {
  constructor(private readonly metaOptionService: MetaOptionService) {}

  @Post()
  create(@Body() body: CreatePostMetaOptionsDto) {
    return this.metaOptionService.create(body);
  }
}
