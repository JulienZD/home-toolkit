import ky, { type Options } from 'ky';
import { PUBLIC_BASE_API_URL } from '$env/static/public';
import { auth } from '$lib/stores/auth';

let authToken: string | undefined = undefined;

const kyClient = ky.create({
  prefixUrl: PUBLIC_BASE_API_URL,
  hooks: {
    beforeRequest: [
      (req) => {
        if (!authToken) return;
        req.headers.set('Authorization', `Bearer ${authToken}`);
      },
    ],
  },
});

auth.subscribe((token) => {
  if (token) {
    authToken = token;
  }
});

type WriteOperationOptions<T> = Omit<Options, 'json'> & {
  json: T;
};

/**
 * A basic wrapper around `ky` to automatically convert all responses to JSON
 */
export const api = {
  get: async <T>(url: string, options?: Options) => kyClient.get(url, options).json<T>(),
  post: async <T>(url: string, options?: WriteOperationOptions<T>) => kyClient.post(url, options).json<T>(),
  put: async <T>(url: string, options?: WriteOperationOptions<T>) => kyClient.put(url, options).json<T>(),
  patch: async <T>(url: string, options?: WriteOperationOptions<Partial<T>>) => kyClient.patch(url, options).json<T>(),
  delete: async <T>(url: string, options?: Options) => kyClient.delete(url, options).json<T>(),
};
