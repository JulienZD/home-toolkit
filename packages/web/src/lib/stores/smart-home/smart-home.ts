import { derived, get, writable } from 'svelte/store';
import type { ISmartLight } from '@home-toolkit/types/smart-home';
import { PUBLIC_BASE_API_URL } from '$env/static/public';
import { auth } from '../auth';
import { createSocket } from './socket';

const socket = createSocket('/smart-home/ws', {
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

interface SmartHomeStore {
  lights: Record<string, ISmartLight>;
}

const smartHomeStore = writable<SmartHomeStore>({ lights: {} });

const createSmartHome = () => {
  const $socket = get(socketWithAuth);

  const updateLight = (light: ISmartLight) => {
    smartHomeStore.update((curr) => {
      return {
        ...curr,
        lights: {
          ...curr.lights,
          [light.id]: light,
        },
      };
    });
  };

  $socket?.on('connect', async () => {
    const token = get(auth); // FIXME: Don't use get?

    // FIXME: Replace with axios / svelte-query call
    const res = await fetch(`${PUBLIC_BASE_API_URL}/smart-home/lights`, {
      headers: {
        Authorization: `Bearer ${token ?? ''}`,
      },
    });
    if (res.ok) {
      const data = (await res.json()) as ISmartLight[];

      data.forEach(updateLight);
    }
  });

  $socket?.on('lightUpdate', (lightUpdate: ISmartLight) => {
    updateLight(lightUpdate);
  });

  const toggleLight = (lightId: string) => {
    const state = get(smartHomeStore);
    const lightState = state.lights[lightId];
    if (!lightState) {
      console.error('No light found');
      return;
    }

    // FIXME: Replace with axios / svelte-query
    fetch(`${PUBLIC_BASE_API_URL}/smart-home/lights/${lightId}`, {
      headers: {
        Authorization: `Bearer ${get(auth) ?? ''}`,
        'Content-Type': 'application/json',
      },
      method: 'PATCH',
      body: JSON.stringify({
        isOn: !lightState.isOn,
      }),
    }).catch(console.error);
  };

  return {
    subscribe: smartHomeStore.subscribe,
    toggleLight,
  };
};

export const smartHome = createSmartHome();
