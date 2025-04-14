import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { ApiPollerService } from './api-poller.service';
import { HttpModule } from '@nestjs/axios';
import { StoryModule } from '../story/story.module';

@Module({
  imports: [ScheduleModule.forRoot(), HttpModule.register({}), StoryModule],
  providers: [ApiPollerService],
  exports: [ApiPollerService],
})
export class ApiPollerModule {}
