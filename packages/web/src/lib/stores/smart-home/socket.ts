import ioClient, { type ManagerOptions, type SocketOptions } from 'socket.io-client';
import { PUBLIC_BASE_WS_URL } from '$env/static/public';

export const createSocket = (
  path: string | undefined = undefined,
  socketOptions: Partial<ManagerOptions & SocketOptions> = {}
) => {
  const socket = ioClient(`${PUBLIC_BASE_WS_URL}`, {
    ...socketOptions,
    path,
  });

  socket.on('connect', () => {
    console.debug('connected', socket.id);
  });

  socket.on('error', (err) => {
    console.error(err);
  });

  socket.on('disconnect', (...args) => {
    console.debug(...args);
  });

  return socket;
};
