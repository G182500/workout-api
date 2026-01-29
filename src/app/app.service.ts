import { Injectable } from '@nestjs/common';

@Injectable()
// Sinaliza que esta classe eh um "Provider", podendo ser injetada em
// outras classes via constructor
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
}
