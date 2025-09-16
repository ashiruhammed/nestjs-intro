import { MetaOption } from 'src/meta-option/meta-option.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { PostStatus } from './enums/postStatus';
import { PostType } from './enums/postType';
import { User } from 'src/users/user.entity';

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

  @OneToOne(() => MetaOption, (metaOption) => metaOption.post, {
    cascade: true,
    eager: true,
  })
  @JoinColumn()
  metaOptions: MetaOption;

  @ManyToOne(() => User, (user) => user.posts)
  @JoinColumn()
  author: User;
}
