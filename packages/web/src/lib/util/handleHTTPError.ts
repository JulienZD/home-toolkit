import { HTTPError } from 'ky';

interface IApiBadRequestError extends Omit<HTTPError, 'response'> {
  response: {
    status: 400 | 422;
    data: {
      fieldErrors: Record<string, string[]>;
      [key: string]: unknown;
    };
  } & HTTPError['response'];
}

type IPossibleHTTPError =
  | {
      error: HTTPError;
      responseStatus: number;
      type: 'http';
    }
  | {
      error: IApiBadRequestError;
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
 * Handles HTTP errors by safely narrowing the type down to be used in the callback
 * @param callback The actual error handler which can safely determine the error type
 *
 * Meant to be used as the direct argument to `Promise.catch()`
 * @example
 * await api.get(endpoint).catch(
 *   handleHTTPError((result) => {
 *     if (result.type === 'http') {
 *       // ...handle HTTP error
 *     }
 *     else if (result.type === ...) {
 *       // ...handle other error
 *     }
 *  })
 * );
 */
export const handleHTTPError =
  (callback: (err: IPossibleHTTPError) => void) => (error: unknown | Error | HTTPError) => {
    if (error instanceof HTTPError) {
      if (error.response.status === 400 || error.response.status === 422) {
        return void callback({
          error: error as IApiBadRequestError,
          responseStatus: error.response.status,
          type: 'validation-error',
        });
      }

      return void callback({
        error,
        responseStatus: error.response.status,
        type: 'http',
      });
    }

    return void callback({
      error,
      type: 'unknown',
      responseStatus: undefined,
    });
  };

/**
 * Creates an error HTTP handler which safely narrows the error type down
 * @param callback The actual error handler which can safely determine the error type
 *
 * Meant to be used within a try-catch
 * @example
 * try {
 *   await api.get(endpoint);
 * } catch (error) {
 *   const handleError = createHTTPErrorHandler((result) => {
 *     if (result.type === 'http') {
 *       // ...handle HTTP error
 *     }
 *     else if (result.type === ...) {
 *       // ...handle other error
 *     }
 *   });
 *
 *   handleError(error);
 * }
 */
export const createHTTPErrorHandler = handleHTTPError;
