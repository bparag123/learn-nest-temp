import {
  AutoIncrement,
  Column,
  HasMany,
  IsEmail,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { Post } from 'src/posts/post.model';
import { User as UserEntity } from './entities/user.entity';

@Table
export class User extends Model<UserEntity> {
  @AutoIncrement
  @PrimaryKey
  @Column
  id: number;

  @IsEmail
  @Column
  email: string;

  @Column
  password: string;

  @HasMany(() => Post)
  post: Post[];
}
