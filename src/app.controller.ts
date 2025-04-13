import { Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiPollerService } from './api-poller/api-poller.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly apiPollerService: ApiPollerService,
  ) {}

  @Get()
  getLastJobDate() {
    return this.apiPollerService.getLastJobDate();
  }

  @Post()
  test() {
    return this.appService.test();
  }
}
