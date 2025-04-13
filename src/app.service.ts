import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class AppService {
  constructor(
    @Inject('PROCESSING_SERVICE')
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
