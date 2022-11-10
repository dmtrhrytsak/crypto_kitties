import { useEffect, useState } from 'react';

import type { Query } from '../../util/http/types';
import type { Fetcher } from './types';

export const useFetcher = <T>(fetcher: Fetcher<T>, query?: Query) => {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    const fetchData = async () => {
      setLoading(true);

      try {
        const data = await fetcher(query);
        if (!cancelled) {
          setData(data);
        }
      } catch (error) {
        if (!cancelled) {
          setError(error as Error);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      cancelled = true;
    };
  }, [query]);

  return { data, error, loading };
};
