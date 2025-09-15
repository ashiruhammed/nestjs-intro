import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { MetaOption } from './meta-option/meta-option.entity';
import { MetaOptionModule } from './meta-option/meta-option.module';
import { Post } from './posts/posts.entity';
import { PostsModule } from './posts/posts.module';
import { Tag } from './tags/tags.entity';
import { TagsModule } from './tags/tags.module';
import { User } from './users/user.entity';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    UsersModule,
    PostsModule,
    AuthModule,
    MetaOptionModule,
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
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
