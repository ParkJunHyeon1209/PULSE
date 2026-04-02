import styled from '@emotion/styled';
import React from 'react';

export default function MainMyPage({ children }) {
  return <MainMyPageWrap>{children}</MainMyPageWrap>;
}

const MainMyPageWrap = styled.div`
  box-sizing: border-box;
  display: flex;
  gap: ${({ theme }) => theme.spacing[8]};

  > * {
    min-width: 0;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    flex-direction: column;
    gap: ${({ theme }) => theme.spacing[5]};
    padding: 0 ${({ theme }) => theme.spacing[6]};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding: 0 ${({ theme }) => theme.spacing[6]};
  }

  @media (max-width: 400px) {
    padding: 0 ${({ theme }) => theme.spacing[6]};
  }
`;
