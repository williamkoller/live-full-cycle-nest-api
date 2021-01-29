import { Product } from '@/models/product.model';
import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProductDto } from '../dtos/create-product.dto';
import { UpdateProdutDto } from '../dtos/update-product.dto';

@Controller('products')
export class ProductController {
  constructor(
    @InjectRepository(Product)
    private readonly repositoryProd: Repository<Product>,
  ) {}
  @Post()
  async store(@Body() body: CreateProductDto): Promise<Product> {
    const product = this.repositoryProd.create(body);
    return await this.repositoryProd.save(product);
  }

  @Get()
  async index(): Promise<Product[]> {
    const products = await this.repositoryProd.find();
    if (products.length === 0) {
      throw new BadRequestException('No records found');
    }
    return products;
  }

  @Put(':id')
  async edit(
    @Param('id') id: string,
    @Body() body: UpdateProdutDto,
  ): Promise<Product> {
    const productId = await this.findById(id);
    const productUpdated = this.repositoryProd.merge(productId, body);
    return await this.repositoryProd.save({
      ...productUpdated,
      ...UpdateProdutDto,
    });
  }

  @Get(':id')
  async show(@Param('id') id: string): Promise<Product> {
    return await this.findById(id);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<{ message: string }> {
    const productId = await this.findById(id);
    await this.repositoryProd.remove(productId);
    return {
      message: 'Product deleted successfully',
    };
  }
  private async findById(id: string): Promise<Product> {
    return await this.repositoryProd.findOneOrFail(id);
  }
}
