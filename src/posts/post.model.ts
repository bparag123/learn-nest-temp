import {
  Model,
  Table,
  Column,
  BelongsTo,
  PrimaryKey,
  AutoIncrement,
  ForeignKey,
} from 'sequelize-typescript';
import { User } from 'src/users/users.model';
import { PostEntity } from './entities/post.entity';

@Table
export class Post extends Model<PostEntity> {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @Column
  title: string;

  @Column
  description: string;

  @ForeignKey(() => User)
  @Column
  userId: number;

  @BelongsTo(() => User)
  user: User;
}
