import { derived, writable } from 'svelte/store';
import { PUBLIC_BASE_API_URL } from '$env/static/public';
import { browser } from '$app/env';
import jwtDecode from 'jwt-decode';
import ky from 'ky';

const LOCAL_STORAGE_ACCESS_TOKEN_KEY = 'accessToken';

const createAuth = () => {
  const existingToken = (browser && localStorage.getItem(LOCAL_STORAGE_ACCESS_TOKEN_KEY)) || null;
  const { subscribe, set: setAuthToken } = writable<string | null>(existingToken);

  return {
    subscribe,
    logout: () => {
      setAuthToken(null);
      browser && localStorage.removeItem(LOCAL_STORAGE_ACCESS_TOKEN_KEY);
    },
    login: async (email: string, password: string) => {
      // Raw call as we have an infinite import cycle otherwise (httpClient depends on this store)
      const { accessToken } = await ky
        .post('authentication/login', {
          prefixUrl: PUBLIC_BASE_API_URL,
          json: {
            email,
            password,
          },
        })
        .json<{ accessToken: string; user: Record<string, string> }>();

      setAuthToken(accessToken);
      browser && localStorage.setItem(LOCAL_STORAGE_ACCESS_TOKEN_KEY, accessToken);
    },
  };
};

export const auth = createAuth();

export const user = derived(auth, ($authToken) => {
  if (!$authToken) {
    return null;
  }

  try {
    return jwtDecode<{ username: string }>($authToken);
  } catch {
    // Malformed JWT means that this isn't a valid user
    browser && localStorage.removeItem(LOCAL_STORAGE_ACCESS_TOKEN_KEY);
    return null;
  }
});
