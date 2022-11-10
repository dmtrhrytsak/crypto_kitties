import type { Query } from '../util/http/types';
import { GetCryptoKittiesResponse, GetCryptoKittyResponse } from './types';
import { get } from '../util/http/methods';

const baseUrl = 'https://ftl-cryptokitties.fly.dev/api/crypto_kitties';

export const getKitties = async (query?: Query) =>
  get<GetCryptoKittiesResponse>(`${baseUrl}`, query);

export const getKitty = async (id: number) =>
  get<GetCryptoKittyResponse>(`${baseUrl}/${id}`);
