import { createParamDecorator, ExecutionContext } from '@nestjs/common';

/**
 * Route handler parameter decorator. Extracts the authenticated user from
 * the `req` object and populates the decorated parameter with the user
 *
 * For example:
 * ```typescript
 * async create(@AuthUser() user: User)
 * ```
 */
export const AuthUser = createParamDecorator((_: unknown, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest();
  return request.user;
});
