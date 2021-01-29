import { Controller, Get, Param } from '@nestjs/common';
import { AppService } from '@/modules/app/service/app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/:name')
  getHello(@Param('name') name: string): string {
    return this.appService.getHello(name);
  }
}
