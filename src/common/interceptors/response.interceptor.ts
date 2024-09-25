import {
  CallHandler,
  ExecutionContext,
  HttpException,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { CustomResponseBodyType } from '../helpers/custom-response.helper';
import { FastifyRequest, FastifyReply } from 'fastify';

@Injectable()
export class ResponseInterceptor<
  T = Record<string, any> | Array<Record<string, any>>,
> implements NestInterceptor
{
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((customResp: CustomResponseBodyType<T>) =>
        this.responseHandler(customResp, context),
      )
    );
  }

  responseHandler(customResp: CustomResponseBodyType<T>, context: ExecutionContext) {
    const ctx = context.switchToHttp();
    const response = ctx.getResponse<FastifyReply>();
    const request = ctx.getRequest<FastifyRequest>();
    const statusCode = response.statusCode || 200; // Default to 200 if status code is not set

    return {
      success: true,
      path: request.url,
      statusCode,
      message: customResp.message || 'Operation completed successfully',
      data: customResp.data,
    };
  }
}