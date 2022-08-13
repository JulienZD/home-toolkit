import { BadRequestException, ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { LoginDto } from '../dto';

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {
  canActivate(context: ExecutionContext) {
    const data = context.switchToHttp().getRequest().body;

    // We have to validate the request body here as guards run before pipes, and @anatine/zod-nestjs
    // does not provide a ZodGuard
    const parseResult = LoginDto.zodSchema.safeParse(data);

    if (!parseResult.success) {
      const message = parseResult.error.flatten();

      throw new BadRequestException(message);
    }

    return super.canActivate(context);
  }
}
