import { Injectable } from '@nestjs/common';
import { MESSAGES } from './core/constants/messages';

@Injectable()
export class AppService {
  healthCheck(): string {
    return MESSAGES.APP.RUNNING;
  }
}
