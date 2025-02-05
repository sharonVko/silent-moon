import React from 'react';
import { Outlet } from 'react-router-dom';

export const RootLayout = () => {
  return (
    <div className="">
      <main className="max-w-[414px]">
        <Outlet />
      </main>
    </div>
  );
};
