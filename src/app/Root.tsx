import { Outlet } from 'react-router-dom';

export function Root() {
  return (
    <>
      <main className="flex flex-col flex-auto h-screen py-2 sm:py-4 lg:py-6 xl:py-8">
        <Outlet />
      </main>
    </>
  );
}
