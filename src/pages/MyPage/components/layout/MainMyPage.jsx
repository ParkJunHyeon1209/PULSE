import styled from '@emotion/styled';
import React from 'react';

export default function MainMyPage({ children }) {
  return <MainMyPageWrap>{children}</MainMyPageWrap>;
}

const MainMyPageWrap = styled.div`
  box-sizing: border-box;
  display: flex;
  gap: ${({ theme }) => theme.spacing[9]};
  margin: ${({ theme }) => theme.spacing[6]} 0 ${({ theme }) => theme.spacing[10]};
  padding: 0 ${({ theme }) => theme.grid.margin};

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    flex-direction: column;
    gap: 0;
  }
`;
