import React from 'react';
import AppHeader from '../common/AppHeader';
import { Outlet } from 'react-router-dom';

export default function MainLayout() {
  return (
    <>
      <AppHeader />
      <main>
        <Outlet />
      </main>
    </>
  );
}
