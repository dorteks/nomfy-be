import {
  Logger,
  Injectable,
  HttpStatus,
  CallHandler,
  HttpException,
  NestInterceptor,
  ExecutionContext,
} from '@nestjs/common';
import { catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { MESSAGES } from '../constants/messages';

@Injectable()
export class ErrorInterceptor implements NestInterceptor {
  intercept(_context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      catchError((err) => {
        const res = err?.response;
        const timestamp = new Date().toISOString();
        Logger.error(res?.technicalMessage || res?.message);
        const status = res?.statusCode ?? HttpStatus.INTERNAL_SERVER_ERROR;
        const message = res?.error ? res?.message : MESSAGES.AN_ERROR_OCCURRED;

        const data = { status, message, timestamp, data: {} };
        return throwError(() => new HttpException(data, status));
      }),
    );
  }
}
