import type { ISmartLight, ISmartLightOperation } from '@home-toolkit/types/smart-home';
import { get, writable } from 'svelte/store';
import { api } from '$lib/api/http';
import { createAuthenticatedSocket } from '../authSocket';

interface SmartHomeStore {
  lights: Record<string, ISmartLight>;
}

const SMART_HOME_PATH = 'smart-home';
const SMART_LIGHT_PATH = `${SMART_HOME_PATH}/lights`;

const smartHomeStore = writable<SmartHomeStore>({ lights: {} });

const socket = createAuthenticatedSocket(`/${SMART_HOME_PATH}/ws`);

const createSmartHome = () => {
  const $socket = get(socket);

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
    const data = await api.get<ISmartLight[]>(SMART_LIGHT_PATH);

    data.forEach(updateLight);
  });

  $socket?.on('lightUpdate', (lightUpdate: ISmartLight) => {
    updateLight(lightUpdate);
  });

  const operateLight = (lightId: string, operation: ISmartLightOperation) => {
    const state = get(smartHomeStore);
    const lightState = state.lights[lightId];
    if (!lightState) {
      throw new Error('Light not found');
    }

    api
      .patch<ISmartLightOperation>(`${SMART_LIGHT_PATH}/${lightId}`, {
        json: operation,
      })
      .catch(console.error);
  };

  return {
    subscribe: smartHomeStore.subscribe,
    operateLight,
  };
};

export const smartHome = createSmartHome();
