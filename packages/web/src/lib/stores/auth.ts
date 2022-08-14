import { derived, writable } from 'svelte/store';
import axios from 'axios';
import { isObject } from '$lib/util/type-guards/isObject';
import jwtDecode from 'jwt-decode';

const baseUrl = 'http://localhost:3000';

const getFromStorage = (key: string) => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem(key);
  }
};

const setStorage = (key: string, value: string) => {
  if (typeof window !== 'undefined') {
    return localStorage.setItem(key, value);
  }
};

const createAuth = () => {
  const existingToken = getFromStorage('accessToken');
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
      setStorage('accessToken', accessToken);
      return true;
    },
  };
};

export const auth = createAuth();

export const user = derived(auth, ($authToken) => {
  if (!$authToken) return null;

  const decoded = jwtDecode($authToken);
  if (isObject(decoded)) {
    return decoded as { username: string };
  }
  return null;
});
