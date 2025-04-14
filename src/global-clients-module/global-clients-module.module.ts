import { Global, Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';
import { PROCESSING_SERVICE_NAME } from '../constants';
import { ConfigModule } from '@nestjs/config';
import { ProcessingServiceConfig } from '../services/processing-service.config';

@Global()
@Module({
  imports: [
    ClientsModule.registerAsync([
      {
        name: PROCESSING_SERVICE_NAME,
        imports: [ConfigModule],
        useClass: ProcessingServiceConfig,
      },
    ]),
  ],
  exports: [ClientsModule],
})
export class GlobalClientsModule {}
