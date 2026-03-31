import styled from '@emotion/styled';
import React from 'react';

export default function MainMyPage({ children }) {
  return <MainMyPageWrap>{children}</MainMyPageWrap>;
}

const MainMyPageWrap = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing[8]};
`;
