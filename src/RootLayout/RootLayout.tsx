import React from 'react';
import { Outlet } from 'react-router-dom';

export const RootLayout = () => {
  return (
    <div className="">
      <main>
        <Outlet />
      </main>
    </div>
  );
};
