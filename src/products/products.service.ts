import { Injectable } from '@nestjs/common';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Product } from './product.model';
import { CreateProductDto } from './dto/create-product.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product)
    private productModel: typeof Product,
  ) {}

  async create(createProductDto: CreateProductDto): Promise<Product> {
    return this.productModel.create(createProductDto);
  }

  async findAll(): Promise<Product[]> {
    return this.productModel.findAll();
  }

  async findOne(id: number): Promise<Product> {
    return this.productModel.findOne({ where: { id } });
  }

  async update(id: number, updateProductDto: UpdateProductDto): Promise<any> {
    return this.productModel.update(updateProductDto, { where: { id } });
  }

  async remove(id: number): Promise<number> {
    return this.productModel.destroy({ where: { id } });
  }
}
