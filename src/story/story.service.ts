import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Story } from '../entities/story.entity';
import { HackerNewsStoryDto } from '../dtos/hacker-news-story.dto';
import { PROCESSING_SERVICE_NAME, STORIES_CREATED_EVENT } from '../constants';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class StoryService {
  constructor(
    @InjectRepository(Story)
    private readonly storyRepository: Repository<Story>,
    @Inject(PROCESSING_SERVICE_NAME)
    private readonly processingService: ClientProxy,
  ) {}

  async saveBatch(stories: Array<HackerNewsStoryDto>) {
    const existingIds = await this.storyRepository
      .createQueryBuilder()
      .select('id')
      .where('id IN (:...ids)', { ids: stories.map((s) => s.id) })
      .getRawMany<{ id: number }>();

    const existingIdSet = new Set(existingIds.map((row) => row.id));

    const newEntities = stories
      .filter((story) => !existingIdSet.has(story.id))
      .map(({ time = 0, ...s }) =>
        this.storyRepository.create({
          ...s,
          createdAt: new Date(time * 1000),
        }),
      );

    if (newEntities.length === 0) {
      console.log('No new entries');
      return;
    }

    const result = await this.storyRepository.insert(newEntities);
    console.log(`Insereted ${result.identifiers.length} NEW entries`);
    this.processingService.emit(STORIES_CREATED_EVENT, result.identifiers);
  }
}
