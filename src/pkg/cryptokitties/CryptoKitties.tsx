import { useState, useRef } from 'react';
import { useSearchParams, Link } from 'react-router-dom';

import type { CryptoKitty } from './types';
import { useInfiniteScroll } from '../hooks/use-infinite-scroll/useInfiniteScroll';
import { useAppNavigation } from '../../app/useAppNavigation';
import { useInfiniteKitties } from './useInfiniteKitties';
import { getSearchByParam, getSortDirectionParam } from './params';
import { getCryptokittyRoute } from '../../app/routes';
import { sortKitties } from './sortKitties';
import { Container } from '../ui/container/Container';
import { Loader } from '../ui/loader/Loader';
import { Image } from '../ui/image/Image';
import { CryptoKittyItem } from './CryptoKittyItem';
import { isLastElement } from '../util/arrays/isLastElement';

export const CryptoKitties = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [sortBy, setSortBy] = useState(() => getSearchByParam(searchParams));
  const [sortDirection, setSortDirection] = useState(() =>
    getSortDirectionParam(searchParams),
  );

  const { kitties, loading, hasMore, nextPage } = useInfiniteKitties();
  const sortedKitties = sortKitties(kitties, sortBy, sortDirection);

  const { goToCryptoKitty } = useAppNavigation();

  const lastKittyRef = useRef<HTMLDivElement>(null);

  useInfiniteScroll(
    lastKittyRef,
    () => {
      nextPage();
    },
    {
      loading,
      hasMore,
      threshold: 0.95,
      rootMargin: '100px',
    },
  );

  const handleSortByChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const sortBy = event.target.value as keyof CryptoKitty;
    setSortBy(sortBy);
    setSearchParams({ sortBy });
  };

  const handleSortDirectionChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    const sortDirection = event.target.value as 'asc' | 'desc';
    setSortDirection(sortDirection);
    setSearchParams({ sortDirection });
  };

  return (
    <div>
      <Container>
        {loading && <Loader />}
        <h1 className="mb-4 text-3xl font-medium">Crypto Kitties ^^</h1>

        <div className="flex items-center mb-4">
          <label htmlFor="sort-by" className="mr-2">
            Sort by:
          </label>

          <select
            id="sort-by"
            className="mr-2"
            value={sortBy}
            onChange={handleSortByChange}
          >
            <option value="id">ID</option>
            <option value="name">Name</option>
            <option value="category">Category</option>
            <option value="price">Price</option>
          </select>

          <select
            id="sort-direction"
            value={sortDirection}
            onChange={handleSortDirectionChange}
          >
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {sortedKitties.map(
            ({ id, name, category, price, image_url, available }, idx) => (
              <CryptoKittyItem
                key={id}
                available={available}
                ref={isLastElement(sortedKitties, idx) ? lastKittyRef : null}
              >
                <CryptoKittyItem.Media
                  tintRatio={id}
                  onClick={() => goToCryptoKitty(id)}
                >
                  <CryptoKittyItem.PriceTag>{price}</CryptoKittyItem.PriceTag>

                  <CryptoKittyItem.Image>
                    <Image src={image_url} alt={name} height={'h-64'} />
                  </CryptoKittyItem.Image>
                </CryptoKittyItem.Media>

                <CryptoKittyItem.Content>
                  <CryptoKittyItem.Info>
                    <p className="font-bold underline-offset-3 hover:underline">
                      <Link to={getCryptokittyRoute(id)}>{name}</Link>
                    </p>
                    <p className="text-neutral-400">{category}</p>
                  </CryptoKittyItem.Info>
                </CryptoKittyItem.Content>
              </CryptoKittyItem>
            ),
          )}
        </div>
      </Container>
    </div>
  );
};
