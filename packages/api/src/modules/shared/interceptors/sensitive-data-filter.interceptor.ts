import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import omitDeep from 'omit-deep-lodash';
import { map, Observable } from 'rxjs';

/**
 * Filters out sensitive data from the response
 */
@Injectable()
export class SensitiveDataFilterInterceptor implements NestInterceptor {
  constructor(private props: string[]) {}
  intercept(_context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(map((data) => omitDeep(data, this.props)));
  }
}
