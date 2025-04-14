import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfigService } from './services/typeorm.config';
import { ApiPollerModule } from './api-poller/api-poller.module';
import { GlobalClientsModule } from './global-clients-module/global-clients-module.module';

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
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
