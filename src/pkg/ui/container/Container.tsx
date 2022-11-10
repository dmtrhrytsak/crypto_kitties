import { PropsWithChildren } from 'react';

export const Container = ({ children }: PropsWithChildren) => {
  return (
    <div className="container mx-auto px-2 md:px-3 lg:px-6 2xl:px-8">
      {children}
    </div>
  );
};
