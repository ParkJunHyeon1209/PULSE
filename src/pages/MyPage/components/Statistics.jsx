import React from 'react';
import useAuthStore from '../../../store/useAuthStore';
import styled from '@emotion/styled';
import useWishlistStore from '../../../store/useWishlistStore';
import useOrderStore from '../../../store/useOrderStore';
import { CouponIcon2, HeartFillIcon, PointIcon, ThunderIcon } from '../../../assets/icons/BtnIcon';

export default function Statistics({ setCategory }) {
  const user = useAuthStore((state) => state.user);
  const wishlistCount = useWishlistStore((state) => state.wishlistIds).length;
  const orderCount = useOrderStore((state) => state.orders.length);
  const statistics = [
    {
      key: 'order',
      icon: <StatisticsIcon as={ThunderIcon} />,
      value: orderCount || 0,
      label: 'TOTAL ORDERS',
      category: 'order',
    },
    {
      key: 'wish',
      icon: <HeartFillIcon />,
      value: wishlistCount || 0,
      label: 'WISHLIST',
      category: 'wish',
    },
    {
      key: 'point',
      icon: <PointIcon />,
      value: user?.point?.toLocaleString() || 0,
      label: 'MEMBER POINT',
      category: 'coupon',
    },
    {
      key: 'coupon',
      icon: <CouponIcon2 />,
      value: user?.coupons?.length || 0,
      label: 'COUPONS',
      category: 'coupon',
    },
  ];

  return (
    <StatisticsWrap>
      <StatisticsList>
        {statistics.map((item) => (
          <StatisticsItem
            key={item.key}
            as="button"
            onClick={() => setCategory?.(item.category)}
            aria-label={`${item.label} 보기`}
          >
            {item.icon}
            <StatisticsCount>{item.value}</StatisticsCount>
            <StatisticsLabel>{item.label}</StatisticsLabel>
          </StatisticsItem>
        ))}
      </StatisticsList>
    </StatisticsWrap>
  );
}

const StatisticsWrap = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing[8]};
  padding: 0 ${({ theme }) => theme.spacing[10]};
  display: flex;
  justify-content: center;
  box-sizing: border-box;
  width: 100%;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    padding: 0 ${({ theme }) => theme.spacing[6]};
  }
`;

const StatisticsList = styled.ul`
  box-sizing: border-box;
  max-width: 1200px;
  width: 100%;
  padding: 0 ${({ theme }) => theme.spacing[10]};
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: ${({ theme }) => theme.spacing[3]};

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    padding: 0;
  }

  @media (max-width: 400px) {
    grid-template-columns: 1fr;
    gap: ${({ theme }) => theme.spacing[2]};
    padding: 0 ${({ theme }) => theme.spacing[3]};
  }
`;

const StatisticsItem = styled.li`
  min-width: 0;
  padding: ${({ theme }) => theme.spacing[5]};
  position: relative;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[3]};
  color: ${({ theme }) => theme.colors.textSecondary};
  border: 1px solid ${({ theme }) => theme.colors.primary + '33'};
  border-radius: ${({ theme }) => theme.radii.md};
  background-color: ${({ theme }) => theme.colors.cardBg};
  text-align: left;
  transition:
    transform ${({ theme }) => theme.motion.fast},
    border-color ${({ theme }) => theme.motion.fast},
    background-color ${({ theme }) => theme.motion.fast};

  &:hover {
    transform: translateY(-2px);
    border-color: ${({ theme }) => theme.colors.primary};
    background-color: ${({ theme }) => theme.colors.primary + '08'};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding: ${({ theme }) => theme.spacing[4]};
  }

  @media (max-width: 400px) {
    gap: ${({ theme }) => theme.spacing[2]};
    padding: ${({ theme }) => theme.spacing[3]};
  }
`;

const StatisticsCount = styled.p`
  font-family: ${({ theme }) => theme.fontFamily.mono};
  font-size: ${({ theme }) => theme.fontSize.m};
  color: ${({ theme }) => theme.colors.text + 'cc'};
`;

const StatisticsIcon = styled.div`
  color: #ffd84d;
`;

const StatisticsLabel = styled.span`
  font-size: ${({ theme }) => theme.fontSize.xxs};
  color: ${({ theme }) => theme.colors.textSecondary};
`;
