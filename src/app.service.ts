import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { PROCESSING_SERVICE_NAME } from './constants';

@Injectable()
export class AppService {
  constructor(
    @Inject(PROCESSING_SERVICE_NAME)
    private readonly processingService: ClientProxy,
  ) {}

  getHello(): string {
    return 'Hello World!';
  }

  test() {
    this.processingService.emit('test', 'ay kalam');
    return 'test';
  }
}
