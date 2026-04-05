import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';
import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';

import AppHeader from '../common/AppHeader/index';
import AppFooter from '../common/AppFooter';
import BaseWipModal from '../common/modals/BaseWipModal';
import BaseDropModal from '../common/modals/BaseDropModal';

const LayoutContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 100vh;
  align-items: center;
  overflow-x: clip;
`;

const pageEnter = keyframes`
  from {
    opacity: 0;
    transform: translateY(26px) scale(0.985);
    filter: blur(12px);
  }

  60% {
    opacity: 1;
    transform: translateY(-4px) scale(1.002);
    filter: blur(2px);
  }

  to {
    opacity: 1;
    transform: translateY(0) scale(1);
    filter: blur(0);
  }
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

const PageTransitionWrap = styled.div`
  width: 100%;
  animation: ${pageEnter} 520ms cubic-bezier(0.22, 1, 0.36, 1);
  will-change: opacity, transform, filter;

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`;

export default function MainLayout() {
  const location = useLocation();

  return (
    <LayoutContainer>
      <AppHeader />
      <MainContent>
        <PageTransitionWrap key={location.pathname}>
          <Outlet />
        </PageTransitionWrap>
      </MainContent>
      <AppFooter />
      <BaseWipModal id="brandStory" label="PULSE BRAND" title="브랜드 스토리" />
      <BaseDropModal />
    </LayoutContainer>
  );
}
