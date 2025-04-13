import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientsModule } from '@nestjs/microservices';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PROCESSING_SERVICE_NAME } from './constants';
import { processingServiceConfig } from './services/processing-service.config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    ClientsModule.registerAsync([
      {
        name: PROCESSING_SERVICE_NAME,
        imports: [ConfigModule],
        inject: [ConfigService],
        useClass: processingServiceConfig,
      },
    ]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
