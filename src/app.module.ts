import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ClientsModule.registerAsync([
      {
        imports: [ConfigModule],
        name: 'PROCESSING_SERVICE',
        useFactory: (configService: ConfigService) => {
          const rabbitmqProtocol =
            configService.get<string>('RABBITMQ_PROTOCOL');
          const rabbitmqUsername =
            configService.get<string>('RABBITMQ_USERNAME');
          const rabbitmqPassword =
            configService.get<string>('RABBITMQ_PASSWORD');
          const rabbitmqHost = configService.get<string>('RABBITMQ_HOST');
          const rabbitmqPort = configService.get<string>('RABBITMQ_PORT');
          const rabbitmqQueue = configService.get<string>('RABBITMQ_QUEUE');
          return {
            transport: Transport.RMQ,
            options: {
              urls: [
                `${rabbitmqProtocol}://${rabbitmqUsername}:${rabbitmqPassword}@${rabbitmqHost}:${rabbitmqPort}`,
              ],
              queue: rabbitmqQueue,
              queueOptions: {
                durable: false, // TODO: check if this should be set to true
              },
            },
          };
        },
        inject: [ConfigService],
      },
    ]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
