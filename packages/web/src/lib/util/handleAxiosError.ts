import type { AxiosError } from 'axios';
import axios from 'axios';
import { isAxiosApiError } from './type-guards/api/isAxiosApiError';

interface IAxiosApiBadRequestError extends Omit<AxiosError, 'response'> {
  response: {
    status: 400 | 422;
    data: {
      fieldErrors: Record<string, string[]>;
      [key: string]: unknown;
    };
  } & AxiosError['response'];
}

type IPossibleAxiosError =
  | {
      error: AxiosError;
      responseStatus: number;
      type: 'axios';
    }
  | {
      error: IAxiosApiBadRequestError;
      responseStatus: 400 | 422;
      type: 'validation-error';
    }
  | {
      error: Error;
      type: 'error';
      responseStatus: undefined;
    }
  | {
      error: unknown;
      type: 'unknown';
      responseStatus: undefined;
    };

/**
 * Handles Axios errors by safely narrowing the type down to be used in the callback
 * @param callback The actual error handler which can safely determine the error type
 *
 * Meant to be used as the direct argument to `Promise.catch()`
 * @example
 * await axios.get(endpoint).catch(
 *   handleAxiosError((result) => {
 *     if (result.type === 'axios-error') {
 *       // ...handle axios error
 *     }
 *     else if (result.type === ...) {
 *       // ...handle other error
 *     }
 *  })
 * );
 */
export const handleAxiosError =
  (callback: (err: IPossibleAxiosError) => void) => (error: unknown | Error | AxiosError) => {
    if (isAxiosApiError(error)) {
      if (error.response.status === 400 || error.response.status === 422) {
        return void callback({
          error: error as IAxiosApiBadRequestError,
          responseStatus: error.response.status,
          type: 'validation-error',
        });
      }

      return void callback({
        error,
        responseStatus: error.response.status,
        type: 'axios',
      });
    }

    return void callback({
      error,
      type: 'unknown',
      responseStatus: undefined,
    });
  };

/**
 * Creates an error Axios handler Handles Axios errors by safely narrowing the type down to be used in the callback
 * @param callback The actual error handler which can safely determine the error type
 *
 * Meant to be used within a try-catch
 * @example
 * try {
 *   await axios.get(endpoint);
 * } catch (error) {
 *   const handleError = createAxiosErrorHandler((result) => {
 *     if (result.type === 'axios-error') {
 *       // ...handle axios error
 *     }
 *     else if (result.type === ...) {
 *       // ...handle other error
 *     }
 *   });
 *
 *   handleError(error);
 * }
 */
export const createAxiosErrorHandler = handleAxiosError;
