import styled from '@emotion/styled';
import React from 'react';
import { Outlet } from 'react-router-dom';

import AppHeader from '../common/AppHeader';
import AppFooter from '../common/AppFooter';

const LayoutContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 100vh;
  align-items: center;
`;

const MainContent = styled.main`
  width: 100%;
  flex: 1;
  max-width: ${({ theme }) => theme.grid.max};
  /* padding-top: 100px;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    padding-top: 140px;
  } */
`;

export default function MainLayout() {
  return (
    <LayoutContainer>
      <AppHeader />
      <MainContent>
        <Outlet />
      </MainContent>
      <AppFooter />
    </LayoutContainer>
  );
}
