import { QueryClient, type QueryFunctionContext } from '@sveltestack/svelte-query';
import { auth } from '$lib/stores/auth';
import axios from 'axios'; // Can't use named import for { Axios } here or Vite will complain :shrug:

const baseUrl = import.meta.env.VITE_API_URL;

let authToken: string | undefined;

interface AuthLoginResponse {
  user: {
    email: string;
  };
  accessToken: string;
}

interface QueryMap {
  foo: AuthLoginResponse;
}

const axiosClient = new axios.Axios({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    Authorization: authToken ? `Bearer ${authToken}` : '',
    'Content-Type': 'application/json',
  },
});

const defaultQueryFn = async <T>({ queryKey }: QueryFunctionContext) => {
  const [key] = queryKey as string[];
  const path = key.startsWith('/') ? key : `/${key}`;

  const { data } = await axiosClient.get<T>(`${baseUrl}${path}`);
  return data;
};

// const defaultMutationFn: MutationFunction = async ({ queryKey }) => {
//   const { data } = await axios.get(`${baseUrl}${queryKey[0]}`)
//   return data;
// }

export const queryClient = new QueryClient({
  defaultOptions: {
    // mutations: {
    //   mutationFn: defaultMutationFn,
    // },
    queries: {
      enabled: authToken !== undefined,
      queryFn: defaultQueryFn,
    },
  },
});

auth.subscribe((token) => {
  if (token) {
    authToken = token;
    void queryClient.refetchQueries({ active: false });
  }
});
