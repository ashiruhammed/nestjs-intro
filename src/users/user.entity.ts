import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
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
}
