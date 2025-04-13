import { Injectable } from '@nestjs/common';
import { Cron, CronExpression, SchedulerRegistry } from '@nestjs/schedule';

const API_POLLER_JOB_NAME = 'api-poller-job';

@Injectable()
export class ApiPollerService {
  constructor(private readonly scheduler: SchedulerRegistry) {}

  // TODO: change this to every day at midnight
  @Cron(CronExpression.EVERY_MINUTE, { name: API_POLLER_JOB_NAME })
  private pollApi() {
    console.log('Cron job executed');
  }

  getLastJobDate() {
    return this.scheduler.getCronJob(API_POLLER_JOB_NAME).lastDate();
  }
}
