import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Exclude } from 'class-transformer';

import { UserRoles } from '../constants/user-roles.constant';
import { Genre } from '../../genres/entities/genre.entity';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255, unique: true, nullable: false })
  email: string;

  @Exclude()
  @Column({ type: 'varchar', length: 255, nullable: false })
  password: string;

  @Column({ type: 'enum', enum: UserRoles })
  role: string;

  @CreateDateColumn({
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createAt: Date;

  @UpdateDateColumn({
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updateAt: Date;

  @DeleteDateColumn({
    type: 'timestamptz',
  })
  deleteAt: Date;

  @ManyToMany(() => Genre, (preference) => preference.users)
  @JoinTable({
    name: 'users_preferences',
    joinColumn: {
      name: 'user_id',
    },
    inverseJoinColumn: {
      name: 'genre_id',
    },
  })
  preferences: Genre[];

  static get relations() {
    return { preferences: 'preferences' };
  }
}
