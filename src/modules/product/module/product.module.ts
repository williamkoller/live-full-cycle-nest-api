import { Module } from '@nestjs/common';
import { ProductController } from '@/modules/product/controller/product.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from '@/models/product.model';

@Module({
  imports: [TypeOrmModule.forFeature([Product])],
  controllers: [ProductController],
})
export class ProductModule {}
