import type { ISmartLightOperation } from '@home-toolkit/types/smart-home';
import { Logger, UseGuards } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server as SocketIoServer, Socket } from 'socket.io';
import { WSAuthGuard } from '../authentication/guards/ws-auth.guard';

@WebSocketGateway({
  cors: true,
  path: '/smart-home/ws',
})
@UseGuards(WSAuthGuard)
export class SmartHomeGateway implements OnGatewayConnection<Socket> {
  @WebSocketServer()
  public server!: SocketIoServer;

  private logger = new Logger('WebSocket');

  handleConnection(@ConnectedSocket() client: Socket) {
    this.logger.debug(`New connection: ${client.id}`);
  }

  @SubscribeMessage('message')
  handleEvent(@MessageBody() data: string) {
    this.server.emit('message', { data });
  }

  @SubscribeMessage('disconnect')
  handleDisconnect(@ConnectedSocket() client: Socket) {
    this.logger.debug(`${client.id} disconnected`);
  }

  @OnEvent('smarthome:light.updated')
  emitLightUpdate(payload: ISmartLightOperation & { name: string; id: string }) {
    this.server.emit('lightUpdate', payload);
  }
}
