import { MetaOption } from 'src/meta-option/meta-option.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { PostStatus } from './enums/postStatus';
import { PostType } from './enums/postType';

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

  @OneToOne(() => MetaOption)
  @JoinColumn()
  metaOptions: MetaOption;
}
