import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  findAll(): string {
    return 'test app service!';
  }
}
