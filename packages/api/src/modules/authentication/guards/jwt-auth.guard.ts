import { ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private readonly reflector: Reflector) {
    super();
  }

  canActivate(context: ExecutionContext) {
    const shouldSkip =
      this.reflector.get('PUBLIC', context.getClass()) || this.reflector.get('PUBLIC', context.getHandler());
    if (shouldSkip) {
      return true;
    }

    return super.canActivate(context);
  }
}
