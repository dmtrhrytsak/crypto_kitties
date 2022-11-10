import { makeSearchParams } from './params';

export async function request<T>(
  url: string,
  options: RequestInit = {},
): Promise<T> {
  const response = await fetch(url, options);

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  return (await response.json()) as T;
}

export async function requestWithQuery<T>(
  url: string,
  query?: Record<string, string | number | boolean>,
  options: RequestInit = {},
): Promise<T> {
  return request<T>(query ? `${url}?${makeSearchParams(query)}` : url, options);
}
