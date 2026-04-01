import styled from '@emotion/styled';
import React from 'react';

const categoryTitleMap = {
  order: '주문 내역',
  wish: '찜 목록',
  review: '작성 리뷰',
  coupon: '혜택 • 쿠폰',
  profile: '프로필 편집',
  address: '배송지 관리',
};

export default function CurrentCategory({ category }) {
  return (
    <CurrentRoute>
      <h2>MY ACCOUNT</h2>
      {category && <h3>{categoryTitleMap[category]}</h3>}
    </CurrentRoute>
  );
}

const CurrentRoute = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[2]};
  padding-bottom: ${({ theme }) => theme.spacing[6]};
  border-bottom: 1px solid ${({ theme }) => theme.colors.primary + '33'};
  margin-bottom: ${({ theme }) => theme.spacing[4]};
  > h2 {
    font-size: ${({ theme }) => theme.fontSize.xxxs};
    color: ${({ theme }) => theme.colors.textSecondary};
  }
  > h3 {
    font-size: ${({ theme }) => theme.fontSize.sm};
  }
`;
