import React from 'react';
import useAuthStore from '../../../store/useAuthStore';
import styled from '@emotion/styled';
import useWishlistStore from '../../../store/useWishlistStore';

export default function Statistics() {
  const user = useAuthStore((state) => state.user);
  const wishlistCount = useWishlistStore((state) => state.wishlistIds).length;

  return (
    <StatisticsWrap>
      <StatisticsList>
        <li>
          <StatisticsCount>{user?.orderCount || 0}</StatisticsCount>
          <StatisticsLabel>주문내역</StatisticsLabel>
        </li>
        <li>
          <StatisticsCount>{wishlistCount || 0}</StatisticsCount>
          <StatisticsLabel>위시리스트</StatisticsLabel>
        </li>
        <li>
          <StatisticsCount>{user?.reviewCount || 0}</StatisticsCount>
          <StatisticsLabel>작성 리뷰</StatisticsLabel>
        </li>
        <li>
          <StatisticsCount>{user?.couponCount || 0}</StatisticsCount>
          <StatisticsLabel>보유 쿠폰</StatisticsLabel>
        </li>
      </StatisticsList>
    </StatisticsWrap>
  );
}

const StatisticsWrap = styled.div`
  width: 100vw;
  margin-left: calc(50% - 50vw);
  margin-bottom: ${({ theme }) => theme.spacing[8]};
  display: flex;
  justify-content: center;
  align-items: center;
  border-top: 1px solid ${({ theme }) => theme.colors.primary};
  border-bottom: 1px solid ${({ theme }) => theme.colors.primary};
`;

const StatisticsList = styled.ul`
  max-width: 1200px;
  width: 100%;
  padding: 0 ${({ theme }) => theme.spacing[10]};
  display: flex;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing[20]};
  > li {
    flex: 1;
    padding: ${({ theme }) => theme.spacing[5]} 0;
    position: relative;
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.spacing[2]};
  }
  > li:not(:last-child)::after {
    content: '';
    position: absolute;
    top: 50%;
    right: -${({ theme }) => theme.spacing[10]};
    transform: translateY(-50%);
    width: 1px;
    height: 100%;
    background-color: ${({ theme }) => theme.colors.primary};
  }
`;

const StatisticsCount = styled.p`
  font-size: ${({ theme }) => theme.fontSize.sm};
  color: ${({ theme }) => theme.colors.textPrimary};
`;

const StatisticsLabel = styled.span`
  font-size: ${({ theme }) => theme.fontSize.xxxs};
  color: ${({ theme }) => theme.colors.textSecondary};
`;
