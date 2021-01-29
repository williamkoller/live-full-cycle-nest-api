import { NestFactory } from '@nestjs/core';
import { AppModule } from '@/modules/app/module/app.module';
import { ModelNotFoundException } from './common/filters/model-not-found.exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new ModelNotFoundException());
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
