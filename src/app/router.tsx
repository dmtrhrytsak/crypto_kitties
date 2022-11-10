import { createHashRouter } from 'react-router-dom';

import { CryptoKitties } from '../pkg/cryptokitties/CryptoKitties';
import { CryptoKitty } from '../pkg/cryptokitties/CryptoKitty';

import { Root } from './Root';
import { routes } from './routes';

export const router = createHashRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      { path: '', element: <CryptoKitties /> },
      { path: routes.cryptokitties, element: <CryptoKitties /> },
      { path: routes.cryptokitty, element: <CryptoKitty /> },
    ],
  },
  { path: '*', element: <div>Not Found</div> },
]);
