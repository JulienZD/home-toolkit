import { auth } from '$lib/stores/auth';
import { createSocket } from '$lib/api/socket';
import { derived } from 'svelte/store';

/**
 * Create an authenticated Socket.io connection using the locally stored auth token
 * @param path The path to find the socket server at
 */
export const createAuthenticatedSocket = (path: string) => {
  const socket = createSocket(path, {
    autoConnect: false,
  });

  const socketWithAuth = derived(auth, ($authToken) => {
    if (!$authToken) {
      socket.close();
      return;
    }

    socket.auth = {
      token: $authToken,
    };

    socket.connect();

    return socket;
  });

  return socketWithAuth;
};
