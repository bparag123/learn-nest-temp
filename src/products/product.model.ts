import {
  AutoIncrement,
  Column,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { ProductEntity } from './entities/product.entity';

@Table
export class Product extends Model<ProductEntity> {
  @AutoIncrement
  @PrimaryKey
  @Column
  id: number;

  @Column
  name: string;

  @Column
  price: number;
}
