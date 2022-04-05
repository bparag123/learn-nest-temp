import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete,
  ParseIntPipe,
  HttpException,
  HttpStatus,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  @UsePipes(ValidationPipe)
  async create(@Body() createProductDto: CreateProductDto) {
    console.log(createProductDto);
    return await this.productsService.create(createProductDto);
  }

  @Get()
  findAll() {
    return this.productsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const product = await this.productsService.findOne(id);
    if (!product) {
      throw new HttpException('Product Not Found', HttpStatus.NOT_FOUND);
    }
    return product;
  }

  @Patch(':id')
  @UsePipes(ValidationPipe)
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.update(+id, updateProductDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productsService.remove(+id);
  }
}
