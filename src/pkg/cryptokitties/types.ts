export type CryptoKitty = {
  id: number;
  name: string;
  category: string;
  price: number;
  image_url: string;
  available: boolean;
  created_at: string;
  updated_at: string;
};

export type GetCryptoKittyResponse = CryptoKitty;

export type GetCryptoKittiesResponse = {
  pagination_info: {
    total: number;
    limit_per_page: number;
    total_pages: number;
    current_page: number;
    next_page: number;
    prev_page: number;
  };
  cats: CryptoKitty[];
};

export type CryptoKittyContextType = {
  available: boolean;
  hovered: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
};

export type CryptoKittyProps = {
  available: boolean;
};

export type CryptoKittyMediaProps = {
  tintRatio?: number;
} & React.HTMLAttributes<HTMLDivElement>;
