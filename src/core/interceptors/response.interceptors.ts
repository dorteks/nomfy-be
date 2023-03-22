import {
  Injectable,
  CallHandler,
  NestInterceptor,
  ExecutionContext,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Response as IResponse } from 'express';
import { MESSAGES } from '../constants/messages';

export interface Response<T> {
  data: T;
}

@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor<T, Response<T>> {
  intercept(
    context: ExecutionContext,
    nextCallHandler: CallHandler,
  ): Observable<Response<T>> {
    const status = context.switchToHttp().getResponse<IResponse>().statusCode;

    return nextCallHandler.handle().pipe(
      map((res) => {
        const timestamp = new Date().toISOString();
        const message = res?.message ?? MESSAGES.SUCCESS;
        return { status, message, timestamp, data: res?.data ?? {} };
      }),
    );
  }
}
