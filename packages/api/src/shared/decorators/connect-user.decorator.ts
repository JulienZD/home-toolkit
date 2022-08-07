import { createParamDecorator, ExecutionContext } from '@nestjs/common';

/** Sets `body.userId` field to the `id` of the authenticated user and returns the body */
export const ConnectUser = createParamDecorator((_: unknown, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest();
  return {
    ...request.body,
    userId: request.user.id,
  };
});
