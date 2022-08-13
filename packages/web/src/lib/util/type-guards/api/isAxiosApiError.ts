import axios, { AxiosError } from 'axios';
import { isObject } from '../isObject';

interface AxiosApiError extends Omit<AxiosError, 'response'> {
  response: {
    data: unknown;
  } & AxiosError['response'];
}

export const isAxiosApiError = (value: unknown): value is AxiosApiError => {
  return axios.isAxiosError(value) && isObject(value?.response) && isObject(value.response.data);
};
