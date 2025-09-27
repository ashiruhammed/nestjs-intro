import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { UsersModule } from 'src/users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from './posts.entity';
import { MetaOptionModule } from 'src/meta-option/meta-option.module';
import { MetaOption } from 'src/meta-option/meta-option.entity';
import { TagsModule } from 'src/tags/tags.module';
import { Tag } from 'src/tags/tags.entity';
import { PaginationModule } from 'src/common/pagination/pagination.module';

@Module({
  controllers: [PostsController],
  providers: [PostsService],
  imports: [
    UsersModule,
    TagsModule,
    TypeOrmModule.forFeature([Post, MetaOption, Tag]),
    MetaOptionModule,
    PaginationModule,
  ],
})
export class PostsModule {}
