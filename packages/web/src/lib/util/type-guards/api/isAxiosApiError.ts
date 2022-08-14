import axios, { AxiosError } from 'axios';

interface AxiosApiError extends Omit<AxiosError, 'response'> {
  response: {
    data: unknown;
  } & AxiosError['response'];
}

export const isAxiosApiError = (value: unknown): value is AxiosApiError => {
  return axios.isAxiosError(value) && !!value.response;
};