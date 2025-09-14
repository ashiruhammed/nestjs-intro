import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { PostStatus } from './enums/postStatus';
import { PostType } from './enums/postType';
import { CreatePostMetaOptionsDto } from './dtos/create-post-metaoptions.dto';

@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  slug: string;

  @Column()
  content: string;

  @Column({
    type: 'enum',
    enumName: 'PostStatus',
    enum: PostStatus,
  })
  status: PostStatus;

  @Column({
    type: 'enum',
    enumName: 'PostType',
    enum: PostType,
  })
  postType: PostType;

  @Column({
    type: 'text',
    array: true,
    default: [],
  })
  tags: string[];

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  publishedOn: Date;

  @Column({
    type: 'json',
    nullable: true,
  })
  metaOptions: CreatePostMetaOptionsDto[];
}
