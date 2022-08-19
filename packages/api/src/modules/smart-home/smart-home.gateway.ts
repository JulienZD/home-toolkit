import type { ISmartLightOperation } from '@home-toolkit/types/smart-home';
import { Logger } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({
  cors: true,
  path: '/smart-home/ws',
})
export class SmartHomeGateway implements OnGatewayConnection<Socket> {
  @WebSocketServer()
  public server!: Server;

  private logger = new Logger('WebSocket');

  // TODO: Use middleware to constantly verify auth
  handleConnection(@ConnectedSocket() client: Socket) {
    // TODO: Auth
    // if (client.handshake.auth.token !== 'secret') {
    //   this.logger.debug(`Disallow connection from ${client.id}, token: ${client.handshake.auth.token}`);
    //   client.disconnect();
    //   return;
    // }

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
