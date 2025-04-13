import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  ClientProvider,
  ClientsModuleOptionsFactory,
  Transport,
} from '@nestjs/microservices';

@Injectable()
export class ProcessingServiceConfig implements ClientsModuleOptionsFactory {
  constructor(private readonly configService: ConfigService) {}

  private getProtocol() {
    return this.configService.get<string>('RABBITMQ_PROTOCOL');
  }

  private getUsername() {
    return this.configService.get<string>('RABBITMQ_USERNAME');
  }

  private getPassword() {
    return this.configService.get<string>('RABBITMQ_PASSWORD');
  }

  private getHost() {
    return this.configService.get<string>('RABBITMQ_HOST');
  }

  private getPort() {
    return this.configService.get<number>('RABBITMQ_PORT');
  }

  private getQueue() {
    return this.configService.get<string>('RABBITMQ_QUEUE');
  }

  createClientOptions(): Promise<ClientProvider> | ClientProvider {
    return {
      transport: Transport.RMQ,
      options: {
        urls: [
          `${this.getProtocol()}://${this.getUsername()}:${this.getPassword()}@${this.getHost()}:${this.getPort()}`,
        ],
        queue: this.getQueue(),
        queueOptions: {
          durable: false, // TODO: check if this should be set to true
        },
      },
    };
  }
}
