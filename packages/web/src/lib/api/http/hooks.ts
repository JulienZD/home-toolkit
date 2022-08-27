import { ApiValidationError } from './errors';
import type { HTTPError } from 'ky';

export const transformErrors = async (httpError: HTTPError): Promise<HTTPError> => {
  const { response } = httpError;
  if (!response || !response.body) {
    httpError.message = 'An unknown error occurred';
  }

  const errorText = await response.text();
  try {
    const error = JSON.parse(errorText) as Record<string, unknown>;
    if (error.message && typeof error.message === 'string') {
      httpError.message = error.message;
    }
    if ([400, 422].includes(httpError.response.status) && error.fieldErrors) {
      return new ApiValidationError(
        {
          ...error,
          fieldErrors: error.fieldErrors as Record<string, string[]>,
        },
        httpError
      );
    }
  } catch {
    httpError.message = errorText;
  }

  return httpError;
};
