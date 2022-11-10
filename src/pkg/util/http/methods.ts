import type { Query } from './types';
import { requestWithQuery } from './request';

export const get = async <T>(
  url: string,
  query?: Query,
  options: RequestInit = {},
): Promise<T> =>
  requestWithQuery<T>(url, query, {
    method: 'GET',
    ...options,
  });
