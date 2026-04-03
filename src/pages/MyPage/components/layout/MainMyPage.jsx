import styled from '@emotion/styled';
import React from 'react';

export default function MainMyPage({ children }) {
  return <MainMyPageWrap>{children}</MainMyPageWrap>;
}

const MainMyPageWrap = styled.div`
  box-sizing: border-box;
  display: flex;
  gap: ${({ theme }) => theme.spacing[9]};
  margin-top: ${({ theme }) => theme.spacing[6]};
  padding: 0 ${({ theme }) => theme.grid.margin};
`;
