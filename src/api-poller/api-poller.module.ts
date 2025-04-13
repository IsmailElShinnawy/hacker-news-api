import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { ApiPollerService } from './api-poller.service';

@Module({
  imports: [ScheduleModule.forRoot()],
  providers: [ApiPollerService],
  exports: [ApiPollerService],
})
export class ApiPollerModule {}
