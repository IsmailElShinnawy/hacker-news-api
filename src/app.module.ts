import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientsModule } from '@nestjs/microservices';
import { ConfigModule } from '@nestjs/config';
import { PROCESSING_SERVICE_NAME } from './constants';
import { ProcessingServiceConfig } from './services/processing-service.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfigService } from './services/typeorm.config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    ClientsModule.registerAsync([
      {
        name: PROCESSING_SERVICE_NAME,
        imports: [ConfigModule],
        useClass: ProcessingServiceConfig,
      },
    ]),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useClass: TypeOrmConfigService,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
