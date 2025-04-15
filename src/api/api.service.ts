import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Mention } from '../entities/mention.entity';
import { FindOptionsWhere, Repository, MoreThanOrEqual, In } from 'typeorm';

type Filters = {
  keywords?: Array<string>;
  fromDate?: Date;
  minCount?: number;
};

@Injectable()
export class ApiService {
  constructor(
    @InjectRepository(Mention)
    private mentionRepository: Repository<Mention>,
  ) {}

  getKeywordsFrequency(filters?: Filters) {
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

    return query.getRawMany();
  }

  async getStoriesByKeywords(filters?: {
    keywords?: Array<string>;
    fromDate?: Date;
  }) {
    const where: FindOptionsWhere<Mention> = {};
    if (filters?.keywords && filters.keywords.length > 0) {
      where.keyword = In(filters.keywords);
    }
    if (filters?.fromDate) {
      where.story = { createdAt: MoreThanOrEqual(filters.fromDate) };
    }

    const queryResult = await this.mentionRepository.find({
      where,
      relations: { story: true },
    });

    const groupedResults = queryResult.reduce((acc, mention) => {
      if (!acc[mention.keyword]) {
        acc[mention.keyword] = [];
      }
      // Array for keyword is initialized if not there
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
      acc[mention.keyword].push(mention.story);
      return acc;
    }, {});

    return groupedResults;
  }
}
