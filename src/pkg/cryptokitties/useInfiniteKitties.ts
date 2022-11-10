import { useCallback, useEffect, useState } from 'react';

import type { CryptoKitty } from './types';
import { getKitties } from './api';

export function useInfiniteKitties() {
  const [page, setPage] = useState(1);
  const [kitties, setKitties] = useState<CryptoKitty[] | []>([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const nextPage = useCallback(() => {
    setPage((prevPage) => prevPage + 1);
  }, []);

  useEffect(() => {
    const fetchKitties = async () => {
      setLoading(true);

      const {
        cats,
        pagination_info: { current_page, total_pages },
      } = await getKitties({ per_page: 15, page });

      setKitties((prevKitties) => [...prevKitties, ...cats]);
      setHasMore(current_page < total_pages);
      setLoading(false);
    };

    fetchKitties();
  }, [page]);

  return { loading, hasMore, kitties, nextPage };
}
