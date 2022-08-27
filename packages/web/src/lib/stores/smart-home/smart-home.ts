import type { ISmartLight, ISmartLightOperation } from '@home-toolkit/types/smart-home';
import { get, writable } from 'svelte/store';
import { api } from '$lib/api/http';
import { createAuthenticatedSocket } from '../authSocket';
import { showNotification } from '$lib/util/notifications';

interface SmartHomeStore {
  lights: Record<string, ISmartLight>;
}

const SMART_HOME_PATH = 'smart-home';
const SMART_LIGHT_PATH = `${SMART_HOME_PATH}/lights`;

const socket = createAuthenticatedSocket(`/${SMART_HOME_PATH}/ws`);

const createSmartHome = () => {
  const smartHomeStore = writable<SmartHomeStore>({ lights: {} });

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

  const socketUnsubscriber = socket.subscribe((io) => {
    if (!io) {
      // Reset the store when the socket closes (unauthenticated)
      smartHomeStore.set({ lights: {} });
      return;
    }

    io.on('connect', async () => {
      const data = await api.get<ISmartLight[]>(SMART_LIGHT_PATH);

      if (data && Array.isArray(data)) {
        data.forEach(updateLight);
      }
    });

    io.on('lightUpdate', updateLight);

    return () => {
      io.off('lightUpdate', updateLight);
    };
  });

  const operateLight = async (lightId: string, operation: ISmartLightOperation) => {
    const state = get(smartHomeStore);
    const lightState = state.lights[lightId];
    if (!lightState) {
      throw new Error('Light not found');
    }

    await api.patch<ISmartLightOperation>(`${SMART_LIGHT_PATH}/${lightId}`, {
      json: operation,
    });
  };

  return {
    subscribe: smartHomeStore.subscribe,
    operateLight,
    unsubscribe: socketUnsubscriber,
  };
};

export const smartHome = createSmartHome();
