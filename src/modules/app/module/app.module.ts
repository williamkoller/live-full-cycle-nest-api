import { forwardRef, Module } from '@nestjs/common';
import { AppController } from '@/modules/app/controller/app.controller';
import { AppService } from '@/modules/app/service/app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from '@/models/product.model';
import { ProductModule } from '@/modules/product/module/product.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: process.env.TYPEORM_CONNECTION as any,
      host: process.env.TYPEORM_HOST,
      port: parseInt(process.env.TYPEORM_PORT),
      username: process.env.TYPEORM_USERNAME,
      password: process.env.TYPEORM_PASSWORD,
      database: process.env.TYPEORM_DATABASE,
      entities: [Product],
    }),
    forwardRef(() => ProductModule),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
