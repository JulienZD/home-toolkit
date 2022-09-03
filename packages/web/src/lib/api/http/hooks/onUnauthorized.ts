import type { AfterResponseHook } from 'ky';
import { auth } from '$lib/stores/auth';

export const onUnauthorized: AfterResponseHook = (request, _options, response) => {
  const requestUrl = new URL(request.url);

  if (response.status === 401 && !requestUrl.pathname.includes('/login')) {
    auth.logout();
  }

  return response;
};
