import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import type { NextFunction, Request, Response } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private logger: Logger;
  constructor() {
    this.logger = new Logger('RouteLogger');
    this.logger.debug('Initialized');
  }

  use(req: Request, _: Response, next: NextFunction) {
    this.logger.log(`[${req.method}] ${req.baseUrl}`);
    next();
  }
}
