import type { IWeatherForecast } from '@home-toolkit/types/weather';
import { api } from '$lib/api/http';
import { getGeolocation } from '$lib/util/helpers/geolocation';
import { writable } from 'svelte/store';

const createWeatherStore = () => {
  let geoLocation: GeolocationPosition;
  let shouldFetch = false;
  let cleanup: undefined | (() => void) = undefined;

  const weatherStore = writable<IWeatherForecast | { error: string }>(undefined, () => {
    return () => {
      if (typeof cleanup === 'function') {
        cleanup();
      }
    };
  });

  const updateWeatherData = () => {
    if (!geoLocation || !shouldFetch) return;

    const { latitude, longitude } = geoLocation.coords;

    api
      .get<IWeatherForecast>(`weather?lat=${latitude}&lon=${longitude}`)
      .then(weatherStore.set)
      .catch((err) => {
        weatherStore.set({ error: err instanceof Error ? err.message : 'An unknown error occurred' });
      });
  };

  let interval: NodeJS.Timer;

  const startFetching = (refetch = false) => {
    if (refetch) updateWeatherData();
    interval && clearInterval(interval);

    // Re-fetch every 5 mins
    interval = setInterval(updateWeatherData, 1000 * 60 * 5);
  };

  cleanup = () => clearInterval(interval);

  return {
    subscribe: weatherStore.subscribe,
    /** Gets the user's geolocation, after which the weather info can be fetched */
    init: async () => {
      // Store was already initialised, prevent unnecessary delay
      if (geoLocation) return;

      geoLocation = await getGeolocation();
      shouldFetch = true;
      updateWeatherData();
    },
    stop: () => (shouldFetch = false),
    start: () => {
      shouldFetch = true;
      // Refetch if there's already an interval going so we have the latest data
      startFetching(!!interval);
    },
  };
};

export const weather = createWeatherStore();
