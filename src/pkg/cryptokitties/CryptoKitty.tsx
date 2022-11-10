import { useFetcher } from '../hooks/use-fetcher/useFetcher';
import { getKitty } from './api';
import { useCryptoKittyId } from './params';
import { Image } from '../ui/image/Image';
import { Loader } from '../ui/loader/Loader';
import { CryptoKittyItem } from './CryptoKittyItem';

export const CryptoKitty = () => {
  const cryptokittyId = useCryptoKittyId();
  const { data, error, loading } = useFetcher(() => getKitty(cryptokittyId));

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <div>Something went wrong</div>;
  }

  if (!data) {
    return <div>Not found</div>;
  }

  return (
    <div className="flex justify-center items-center h-full">
      {/* Its not really at the center because of some padding of the container */}
      {/* Make it at the center horizontally and vertically */}
      <div className="flex justify-center">
        <CryptoKittyItem available={data.available}>
          <CryptoKittyItem.Media tintRatio={data.id}>
            <CryptoKittyItem.PriceTag>{data.price}</CryptoKittyItem.PriceTag>

            <CryptoKittyItem.Image>
              <Image src={data.image_url} alt={data.name} height={'h-64'} />
            </CryptoKittyItem.Image>
          </CryptoKittyItem.Media>

          <CryptoKittyItem.Content>
            <CryptoKittyItem.Info>
              <p className="font-bold">{data.name}</p>
              <p className="text-neutral-400">{data.category}</p>
            </CryptoKittyItem.Info>
          </CryptoKittyItem.Content>
        </CryptoKittyItem>
      </div>
    </div>
  );
};
