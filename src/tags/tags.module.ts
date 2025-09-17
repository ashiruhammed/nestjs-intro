import { Module } from '@nestjs/common';
import { TagsController } from './tags.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tag } from './tags.entity';
import { TagService } from './tag.service';

@Module({
  providers: [TagService],
  controllers: [TagsController],
  imports: [TypeOrmModule.forFeature([Tag])],
  exports: [TagService],
})
export class TagsModule {}
