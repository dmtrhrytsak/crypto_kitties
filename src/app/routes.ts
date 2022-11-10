export const routes = {
  cryptokitties: '/cryptokitties',
  cryptokitty: '/cryptokitties/:cryptokittyId',
};

export const getCryptoKittiesRoute = () => routes.cryptokitties;
export const getCryptokittyRoute = (cryptokittyId: number) =>
  routes.cryptokitty.replace(':cryptokittyId', String(cryptokittyId));
