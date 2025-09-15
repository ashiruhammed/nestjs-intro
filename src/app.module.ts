import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostsModule } from './posts/posts.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/user.entity';
import { Post } from './posts/posts.entity';
import { TagsModule } from './tags/tags.module';
import { Tag } from './tags/tags.entity';
import { MetaOptionController } from './meta-option/meta-option.controller';
import { MetaOptionModule } from './meta-option/meta-option.module';
import { MetaOption } from './meta-option/meta-option.entity';

@Module({
  imports: [
    UsersModule,
    PostsModule,
    AuthModule,
    TypeOrmModule.forRootAsync({
      imports: [],
      inject: [],
      useFactory: () => ({
        type: 'postgres',
        host: 'localhost',
        port: 5431,
        username: 'postgres',
        password: 'ashiru123@',
        database: 'postgres',
        entities: [User, Post, Tag, MetaOption],
        synchronize: true,
        autoLoadEntities: true,
      }),
    }),
    TagsModule,
    MetaOptionModule,
  ],
  controllers: [AppController, MetaOptionController],
  providers: [AppService],
})
export class AppModule {}
