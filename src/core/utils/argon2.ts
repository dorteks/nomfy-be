import {
  HttpStatus,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import * as $argon2 from 'argon2';
import { MESSAGES } from '../constants/messages';

@Injectable()
export class Argon2 {
  async hash(plain: string) {
    try {
      return await $argon2.hash(plain, {
        timeCost: 8,
        hashLength: 64,
        memoryCost: 2 ** 18,
      });
    } catch (error: any) {
      throw new InternalServerErrorException({
        technialMessage: error.message,
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      });
    }
  }

  async verify(hash: string, plain: string) {
    try {
      if (await $argon2.verify(hash, plain)) {
        console.log('Success, User logged in');
        return MESSAGES.SUCCESS;
      } else {
        console.log('incorrect email or password');
        return undefined;
      }
    } catch (error: any) {
      throw new InternalServerErrorException({
        technialMessage: error.message,
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      });
    }
  }
}
