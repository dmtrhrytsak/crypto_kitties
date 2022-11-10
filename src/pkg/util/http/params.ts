import type { Query } from './types';

export const makeSearchParams = (query: Query) =>
  new URLSearchParams(stringifyQuery(query));

export const stringifyQuery = (query: Query): Record<string, string> =>
  Object.fromEntries(
    Object.entries(query).map(([key, value]) => [key, String(value)]),
  );
