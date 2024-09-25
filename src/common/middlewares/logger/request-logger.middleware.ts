import { Injectable, NestMiddleware, Logger } from '@nestjs/common';

@Injectable()
export class RequestMiddleware implements NestMiddleware {
  private logger = new Logger('HTTP');

  use(req: any, res: any, next: any): void {
    const { method, originalUrl, body, query, params } = req;
    const start = Date.now();
    this.logger.debug({
      method: method,
      url: originalUrl,
      payload: {},
    });
    res.on('finish', () => {
      const { statusCode } = res;
      const duration = Date.now() - start;
      const log = `${method} ${originalUrl} ${statusCode} ${duration}ms`;
      const timestamp = new Date().toISOString();
      const logDetails = {
        log: log,
        payload: {},
        timestamp: timestamp,
      };
      if (statusCode >= 400) {
        this.logger.error(JSON.stringify(logDetails));
      } else {
        this.logger.log(JSON.stringify(logDetails));
      }
    });

    next();
  }
}