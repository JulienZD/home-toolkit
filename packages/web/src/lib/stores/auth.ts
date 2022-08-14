import { derived, writable } from 'svelte/store';
import axios from 'axios';
import jwtDecode from 'jwt-decode';

const baseUrl = import.meta.env.VITE_API_URL;

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
      const { data } = await axios.post<{ accessToken: string; user: Record<string, string> }>(
        `${baseUrl}/authentication/login`,
        {
          email,
          password,
        }
      );

      const { accessToken } = data;

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
