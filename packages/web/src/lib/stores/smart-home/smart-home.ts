import type { ISmartLight, ISmartLightOperation } from '@home-toolkit/types/smart-home';
import { get, writable } from 'svelte/store';
import { PUBLIC_BASE_API_URL } from '$env/static/public';
import { createAuthenticatedSocket } from '../authSocket';

interface SmartHomeStore {
  lights: Record<string, ISmartLight>;
}

const SMART_HOME_PATH = 'smart-home';
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
