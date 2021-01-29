import { Module } from '@nestjs/common';
import { AppController } from '@/modules/app/controller/app.controller';
import { AppService } from '@/modules/app/service/app.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
