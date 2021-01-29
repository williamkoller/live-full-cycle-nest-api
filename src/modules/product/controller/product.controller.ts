import { Product } from '@/models/product.model';
import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
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
    return await this.repositoryProd.find();
  }

  @Put('/:id')
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

  @Get('/:id')
  async show(@Param('id') id: string): Promise<Product> {
    return await this.findById(id);
  }

  private async findById(id: string): Promise<Product> {
    return await this.repositoryProd.findOneOrFail(id);
  }
}
