import ky, { type Options } from 'ky';
import { PUBLIC_BASE_API_URL } from '$env/static/public';
import { auth } from '$lib/stores/auth';

type WriteOperationOptions<T> = Omit<Options, 'json'> & {
  json: T;
};

interface API {
  get: <T>(url: string, options?: Options) => Promise<T>;
  post<T, R = unknown>(url: string, options?: WriteOperationOptions<T>): Promise<R>;
  post<T>(url: string, options?: WriteOperationOptions<T>): Promise<T>;
  put: <T>(url: string, options?: WriteOperationOptions<T>) => Promise<T>;
  patch: <T>(url: string, options?: WriteOperationOptions<Partial<T>>) => Promise<T>;
  delete: <T>(url: string, options?: Options) => Promise<T>;
}

type RequestMethod = 'get' | 'post' | 'put' | 'patch' | 'delete';

class Api implements API {
  private kyClient: typeof ky;
  private authToken?: string;

  constructor() {
    this.kyClient = ky.create({
      prefixUrl: PUBLIC_BASE_API_URL,
      hooks: {
        beforeRequest: [
          (req) => {
            if (!this.authToken) return;
            req.headers.set('Authorization', `Bearer ${this.authToken}`);
          },
        ],
      },
    });

    if (!auth) {
      throw new Error('Authentication store was not yet initialised');
    }

    auth.subscribe((token) => {
      this.authToken = token ?? undefined;
    });
  }

  public async get<T>(url: string, options?: Options): Promise<T> {
    return this.request<T>('get', url, options);
  }

  post<T>(url: string, options?: WriteOperationOptions<T>): Promise<T>;
  post<T, R = unknown>(url: string, options?: WriteOperationOptions<T>): Promise<R>;
  public async post<T>(url: string, options?: WriteOperationOptions<T>) {
    return this.request<T>('post', url, options);
  }

  public async put<T>(url: string, options?: WriteOperationOptions<T>): Promise<T> {
    return this.request<T>('put', url, options);
  }
  public async patch<T>(url: string, options?: WriteOperationOptions<Partial<T>>): Promise<T> {
    return this.request<T>('patch', url, options);
  }
  public async delete<T>(url: string, options?: Options): Promise<T> {
    return this.request<T>('delete', url, options);
  }

  private async request<T>(method: RequestMethod, url: string, options?: Options) {
    // Override the prefix url if need be
    const client = options?.prefixUrl ? this.extendClient(options) : this.kyClient;

    return client[method](url, options).json<T>();
  }

  private extendClient(options: Options) {
    return this.kyClient.extend(options);
  }
}

export const api = new Api();
