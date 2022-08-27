import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Socket } from 'socket.io';

@Injectable()
export class WSAuthGuard extends AuthGuard('wsjwt') {
  getRequest(context: ExecutionContext) {
    return context.switchToWs().getClient<Socket>().handshake;
  }
}
