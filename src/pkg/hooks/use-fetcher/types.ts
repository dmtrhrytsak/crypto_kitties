import { Query } from '../../util/http/types';

export type Fetcher<T> = (query?: Query) => Promise<T>;
