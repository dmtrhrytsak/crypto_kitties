import type { CryptoKitty } from './types';

export const sortKitties = (
  kitties: CryptoKitty[],
  sortBy: keyof CryptoKitty,
  sortDirection: 'asc' | 'desc',
) => {
  const sortedKitties = [...kitties];

  sortedKitties.sort((a, b) => {
    if (a[sortBy] < b[sortBy]) {
      return sortDirection === 'asc' ? -1 : 1;
    }

    if (a[sortBy] > b[sortBy]) {
      return sortDirection === 'asc' ? 1 : -1;
    }

    return 0;
  });

  return sortedKitties;
};
