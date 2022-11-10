import { useParams } from 'react-router-dom';

import type { CryptoKitty } from './types';

export const useCryptoKittyId = () =>
  Number(useParams<{ cryptokittyId: string }>().cryptokittyId) ?? -1;

export const getSearchByParam = (searchParams: URLSearchParams) =>
  (searchParams.get('sortBy') ?? 'id') as keyof CryptoKitty;

export const getSortDirectionParam = (searchParams: URLSearchParams) =>
  (searchParams.get('sortDirection') ?? 'asc') as 'asc' | 'desc';
