import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { ApiPollerService } from './api-poller.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [ScheduleModule.forRoot(), HttpModule.register({})],
  providers: [ApiPollerService],
  exports: [ApiPollerService],
})
export class ApiPollerModule {}
