import { derived, writable } from 'svelte/store';
import { PUBLIC_BASE_API_URL } from '$env/static/public';
import jwtDecode from 'jwt-decode';
import ky from 'ky';

const getFromLocalStorage = (key: string) => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem(key);
  }
};

const persistToLocalStorage = (key: string, value: string) => {
  if (typeof window !== 'undefined') {
    return localStorage.setItem(key, value);
  }
};

const createAuth = () => {
  const existingToken = getFromLocalStorage('accessToken');
  const { subscribe, set: setAuthToken } = writable<string | null>(existingToken);

  return {
    subscribe,
    logout: () => setAuthToken(null),
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
    },
  };
};

export const auth = createAuth();

export const user = derived(auth, ($authToken) => {
  if (!$authToken) {
    persistToLocalStorage('accessToken', '');
    return null;
  }

  try {
    const data = jwtDecode($authToken);

    // We know it's a valid token at this point
    persistToLocalStorage('accessToken', $authToken);
    return data as { username: string };
  } catch {
    return null;
  }
});
