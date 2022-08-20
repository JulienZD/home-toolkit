import { QueryClient, type QueryFunctionContext } from '@sveltestack/svelte-query';
import { api } from './http';
import { auth } from '$lib/stores/auth';

const defaultQueryFn = async <T>({ queryKey }: QueryFunctionContext) => {
  const [key] = queryKey as string[];
  const path = key.startsWith('/') ? key.slice(1) : key;

  return api.get<T>(path);
};

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      enabled: false,
      queryFn: defaultQueryFn,
    },
  },
});

auth.subscribe((token) => {
  const defaultOpts = queryClient.getDefaultOptions();
  queryClient.setDefaultOptions({
    ...defaultOpts,
    queries: {
      ...defaultOpts.queries,
      enabled: !!token,
    },
  });

  if (token) {
    void queryClient.refetchQueries({ active: false });
  }
});
