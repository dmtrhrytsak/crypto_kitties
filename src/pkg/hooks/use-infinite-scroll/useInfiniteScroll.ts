import { type RefObject, useRef, useEffect } from 'react';

import type { UseInfiniteScrollOptions } from './types';

export function useInfiniteScroll(
  ref: RefObject<HTMLElement>,
  callback: () => void,
  options: UseInfiniteScrollOptions = {},
) {
  const { rootMargin, threshold, hasMore, loading } = options;
  const observer = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    if (!ref.current) {
      return;
    }

    if (loading || !hasMore) {
      return;
    }

    const handleIntersection: IntersectionObserverCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          callback();
        }
      });
    };

    observer.current = new IntersectionObserver(handleIntersection, {
      rootMargin,
      threshold,
    });

    observer.current.observe(ref.current);

    return () => observer.current?.disconnect();
  }, [ref, rootMargin, threshold, loading, hasMore, callback]);
}
