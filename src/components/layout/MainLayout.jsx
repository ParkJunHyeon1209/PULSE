import styled from '@emotion/styled';
import React from 'react';
import { Outlet } from 'react-router-dom';
import BaseBtn from '../common/BaseBtn';
import AppHeader from '../common/AppHeader';
import AppFooter from '../common/AppFooter';
import BaseSection from '../common/BaseSection';

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
`;

export default function MainLayout() {
  return (
    <LayoutContainer>
      <AppHeader />
      <MainContent>
        <Outlet />
        <BaseBtn variant="secondary" tone="violet" padding="12px 24px">
          공지사항 보러가기
        </BaseBtn>
        <BaseSection label="LABEL" title="Test" sub="섹션 설명입니다."></BaseSection>
      </MainContent>
      <AppFooter />
    </LayoutContainer>
  );
}
