import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Mention } from '../entities/mention.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ApiService {
  constructor(
    @InjectRepository(Mention)
    private mentionRepository: Repository<Mention>,
  ) {}

  async getKeywordsFrequency(filters?: {
    keywords?: Array<string>;
    fromDate?: Date;
    minCount?: number;
  }) {
    const query = this.mentionRepository
      .createQueryBuilder('mention')
      .select('mention.keyword', 'keyword')
      .addSelect('SUM(mention.count)', 'frequency')
      .leftJoin('mention.story', 'story')
      .groupBy('mention.keyword')
      .orderBy('frequency', 'DESC');

    if (filters?.keywords && filters.keywords.length > 0) {
      const keywordConditions = filters.keywords
        .map((_, index) => `LOWER(mention.keyword) LIKE :keyword${index}`)
        .join(' OR ');

      const keywordParams = filters.keywords.reduce(
        (params, keyword, index) => {
          params[`keyword${index}`] = `%${keyword.toLowerCase()}%`;
          return params;
        },
        {},
      );

      query.andWhere(`(${keywordConditions})`, keywordParams);
    }

    if (filters?.fromDate) {
      query.andWhere('story.createdAt >= :fromDate', {
        fromDate: filters.fromDate,
      });
    }

    if (filters?.minCount) {
      query.having('SUM(mention.count) >= :minCount', {
        minCount: filters.minCount,
      });
    }

    return { result: await query.getRawMany() };
  }

  getStoriesByKeywords() {}
}
