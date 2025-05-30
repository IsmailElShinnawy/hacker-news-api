import { Controller, Get, Query } from '@nestjs/common';
import { ApiService } from './api.service';

@Controller('api')
export class ApiController {
  constructor(private readonly apiService: ApiService) {}

  @Get('frequency')
  async getKeywordsFrequency(
    @Query('keywords') keywords?: string,
    @Query('fromDate') fromDate?: string,
    @Query('minCount') minCount?: string,
  ) {
    return this.apiService.getKeywordsFrequency({
      keywords: keywords
        ? keywords?.split(',').map((k) => k.trim())
        : undefined,
      fromDate: fromDate ? new Date(fromDate) : undefined,
      minCount: minCount ? Number(minCount) : undefined,
    });
  }

  @Get('stories')
  async getStories(
    @Query('keywords') keywords?: string,
    @Query('fromDate') fromDate?: string,
  ) {
    return this.apiService.getStoriesByKeywords({
      keywords: keywords
        ? keywords?.split(',').map((k) => k.trim())
        : undefined,
      fromDate: fromDate ? new Date(fromDate) : undefined,
    });
  }
}
