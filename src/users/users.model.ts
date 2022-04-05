import {
  AutoIncrement,
  Column,
  IsEmail,
  Model,
  NotNull,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
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
}
