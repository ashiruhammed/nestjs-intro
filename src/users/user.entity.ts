import { Post } from 'src/posts/posts.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
  })
  name: string;

  @Column({
    unique: true,
  })
  email: string;

  @Column({
    type: 'varchar',
  })
  phoneNumber: string;

  @OneToMany(() => Post, (post) => post.author)
  posts: Post[];
}
