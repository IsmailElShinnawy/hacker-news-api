import { Module } from '@nestjs/common';
import { ApiController } from './api.controller';
import { ApiService } from './api.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Mention } from '../entities/mention.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Mention])],
  controllers: [ApiController],
  providers: [ApiService],
})
export class ApiModule {}
