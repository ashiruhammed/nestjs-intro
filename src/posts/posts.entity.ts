import { MetaOption } from 'src/meta-option/meta-option.entity';
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { PostStatus } from './enums/postStatus';
import { PostType } from './enums/postType';
import { User } from 'src/users/user.entity';
import { Tag } from 'src/tags/tags.entity';

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
  @ManyToMany(() => Tag, (tag) => tag.posts)
  @JoinTable()
  tags: Tag[] | null;

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
