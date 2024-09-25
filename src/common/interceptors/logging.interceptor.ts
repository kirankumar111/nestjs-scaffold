import {
    Injectable,
    NestInterceptor,
    ExecutionContext,
    CallHandler,
    Inject,
  } from '@nestjs/common';
  import { Observable, throwError } from 'rxjs';
  import { catchError, tap } from 'rxjs/operators';
  import { Logger } from 'nestjs-pino';
  import { FastifyRequest, FastifyReply } from "fastify";
  
  import { v4 as uuidv4 } from 'uuid';
  import { APP_NAME, APP_VERSION } from '../../common/constants/app-config';
  
  // Define a type for the log data structure
  interface LogData {
    reqId:string,
    method: string;
    url: string;
    processingTime: number;
    statusCode: number;
    requestReceivedAt: string;
    service: string;
    version: string;
    headers: Record<string, string | string[]>;
    request_body: any;
    response_body: any;
    cookies?: Record<string, string>;
    params?: Record<string, any>;
    query?: Record<string, any>;
  }
  
  @Injectable()
  export class LoggingInterceptor implements NestInterceptor {
    private readonly excludedRoutes = [
      '/health',
      '/',
    ];
    constructor(
      @Inject(Logger)private readonly logger: Logger
    ) {}
  
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
      const request = context.switchToHttp().getRequest<FastifyRequest>();
      const response = context.switchToHttp().getResponse<FastifyReply>();
      if (this.excludedRoutes.includes(request.url)) {
        return next.handle();
      }
      const statusCode = response.statusCode;
      const { method, url, headers, cookies, params, query, body, id } = request;
      const now = Date.now();
      const requestReceivedAt = new Date(now).toLocaleString('en-US', { 
                                    timeZone: 'IST', 
                                    hour12: false 
                                }) + `.${new Date(now).getMilliseconds()}`;
    //   const traceId = uuidv4();
    //   request.headers['x-tracer-id'] = traceId;
    //   response.header('x-tracer-id', traceId);
      return next.handle().pipe(
        tap((responseBody) => {
          const processingTime = Date.now() - now;
          const logData: LogData = {
            reqId:id,
            method,
            url,
            processingTime,
            statusCode,
            requestReceivedAt,
            service: APP_NAME,
            version: APP_VERSION,
            headers:Object.fromEntries(
              Object.entries(headers).filter(([_, v]) => v !== undefined)
            ) as Record<string, string | string[]>,
            request_body: body || {},
            cookies:Object.fromEntries(
              Object.entries(cookies).filter(([_, v]) => v !== undefined)
            ) as Record<string, string>,
            params:params as Record<string, any>,
            query:query as Record<string, any>,
            response_body: responseBody,
          };
          this.logger.log(JSON.stringify(logData));
        }),
        catchError((error) => {
            // Log the error before re-throwing it to the global exception filter
            const processingTime = Date.now() - now;
            this.logger.error({
              message: 'Request failed',
              method,
              url,
              processingTime,
            //   traceId,
              errorMessage: error.message,
              errorStack: error.stack,
            });
    
            // Re-throw the error so it can be handled by the global exception filter
            return throwError(() => error);
        }),
      );
    }
  }