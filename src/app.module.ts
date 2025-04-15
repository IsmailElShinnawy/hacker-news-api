import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfigService } from './services/typeorm.config';
import { ApiPollerModule } from './api-poller/api-poller.module';
import { GlobalClientsModule } from './global-clients-module/global-clients-module.module';
import { ApiModule } from './api/api.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    GlobalClientsModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useClass: TypeOrmConfigService,
    }),
    ApiPollerModule,
    ApiModule,
  ],
})
export class AppModule {}
