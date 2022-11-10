import { useNavigate } from 'react-router-dom';

import { getCryptoKittiesRoute, getCryptokittyRoute } from './routes';

export function useAppNavigation() {
  const navigate = useNavigate();

  return {
    goToCryptoKitties: () => {
      navigate(getCryptoKittiesRoute());
    },
    goToCryptoKitty: (cryptokittyId: number) => {
      navigate(getCryptokittyRoute(cryptokittyId));
    },
  };
}
