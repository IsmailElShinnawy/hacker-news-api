import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Cron, CronExpression, SchedulerRegistry } from '@nestjs/schedule';
import { forkJoin } from 'rxjs';
import { StoryService } from '../story/story.service';
import { HackerNewsStoryDto } from 'src/dtos/hacker-news-story.dto';

const API_POLLER_JOB_NAME = 'api-poller-job';

@Injectable()
export class ApiPollerService {
  constructor(
    private readonly scheduler: SchedulerRegistry,
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
    private readonly storyService: StoryService,
  ) {}

  private getApiUrl() {
    return `${this.configService.get('API_URL')}/${this.configService.get('API_VERSION')}`;
  }

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT, { name: API_POLLER_JOB_NAME })
  private pollApi() {
    this.httpService
      .get<
        Array<HackerNewsStoryDto['id']>
      >(`${this.getApiUrl()}/topstories.json`)
      .subscribe((res) => {
        forkJoin(
          res.data
            .slice(0, 50)
            .map((id) =>
              this.httpService.get<HackerNewsStoryDto>(
                `${this.getApiUrl()}/item/${id}.json`,
              ),
            ),
        ).subscribe((res) => {
          void this.storyService.saveBatch(res.map((s) => s.data));
        });
      });
  }

  getLastJobDate() {
    return this.scheduler.getCronJob(API_POLLER_JOB_NAME).lastDate();
  }
}
