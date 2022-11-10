import { type PropsWithChildren, useMemo, forwardRef } from 'react';

import type {
  CryptoKittyContextType,
  CryptoKittyProps,
  CryptoKittyMediaProps,
} from './types';
import { useHover } from '../hooks/use-hover/useHover';
import { createContext } from '../util/context/createContext';

export const [useCryptoKittyContext, CryptoKittyProvider] =
  createContext<CryptoKittyContextType>();

const CryptoKittyItem = forwardRef<
  HTMLDivElement,
  PropsWithChildren<CryptoKittyProps>
>(({ children, available = true }, ref) => {
  const { hovered, onMouseEnter, onMouseLeave } = useHover();

  const contextValue = useMemo(
    () => ({ available, hovered, onMouseEnter, onMouseLeave }),
    [available, hovered, onMouseEnter, onMouseLeave],
  );

  return (
    <CryptoKittyProvider value={contextValue}>
      <div ref={ref} className="bg-white">
        {children}
      </div>
    </CryptoKittyProvider>
  );
});

CryptoKittyItem.displayName = 'CryptoKittyItem';

const mediaColors = [
  { normal: 'bg-blue-100', hover: 'hover:bg-blue-200' },
  { normal: 'bg-purple-100', hover: 'hover:bg-purple-200' },
  { normal: 'bg-lime-100', hover: 'hover:bg-lime-200' },
  { normal: 'bg-pink-100', hover: 'hover:bg-pink-200' },
];

const CryptoKittyItemMedia = ({
  children,
  tintRatio = 0,
  ...props
}: PropsWithChildren<CryptoKittyMediaProps>) => {
  const { onMouseEnter, onMouseLeave } = useCryptoKittyContext();

  const bgColor = mediaColors[tintRatio % mediaColors.length];

  return (
    <div
      className={`relative mb-2 rounded-md ${bgColor.normal} cursor-pointer transition-colors ${bgColor.hover}`}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      {...props}
    >
      {children}
    </div>
  );
};

const CryptoKittyItemPriceTag = ({ children }: PropsWithChildren) => {
  const { available, hovered } = useCryptoKittyContext();

  return hovered ? (
    <div
      className={`absolute top-0 right-0 px-2 py-1 rounded-bl-md bg-white text-xs font-semibold ${
        available ? 'text-green-400' : 'text-red-400'
      } transition-colors`}
    >
      {available ? `${children} ETH` : 'Sold Out'}
    </div>
  ) : null;
};

const CryptoKittyItemImage = ({ children }: PropsWithChildren) => {
  const { available } = useCryptoKittyContext();

  return (
    <div
      className={`w-64 m-auto transition-opacity ${
        available ? 'opacity-100' : 'opacity-50'
      }`}
    >
      {children}
    </div>
  );
};

const CryptoKittyItemContent = ({ children }: PropsWithChildren) => {
  const { available } = useCryptoKittyContext();

  return (
    <div className={`${available ? 'opacity-100' : 'opacity-50'}`}>
      {children}
    </div>
  );
};

const CryptoKittyItemInfo = ({ children }: PropsWithChildren) => {
  return <div className="flex items-center gap-2">{children}</div>;
};

const CompoundCryptoKittyItem = Object.assign({}, CryptoKittyItem, {
  Media: CryptoKittyItemMedia,
  PriceTag: CryptoKittyItemPriceTag,
  Image: CryptoKittyItemImage,
  Content: CryptoKittyItemContent,
  Info: CryptoKittyItemInfo,
});

export { CompoundCryptoKittyItem as CryptoKittyItem };
