import React from 'react';
import useAuthStore from '../../../../store/useAuthStore';
import styled from '@emotion/styled';
import useWishlistStore from '../../../../store/useWishlistStore';
import useOrderStore from '../../../../store/useOrderStore';
import useReviewStore from '../../../../store/useReviewStore';
import {
  CouponIcon2,
  HeartFillIcon,
  ReviewFillIcon,
  ThunderIcon,
} from '../../../../assets/icons/BtnIcon';

const VARIANT_COLORS = {
  blue: {
    border: 'rgba(0,76,255,.18)',
    hoverBorder: 'rgba(0,76,255,.4)',
    hoverBg: 'rgba(0,76,255,.06)',
    glow: '#004CFF',
    valDark: '#4D85FF',
    valLight: '#2563eb',
  },
  cyan: {
    border: 'rgba(0,212,255,.12)',
    hoverBorder: 'rgba(0,212,255,.32)',
    hoverBg: 'rgba(0,212,255,.06)',
    glow: '#00D4FF',
    valDark: '#00D4FF',
    valLight: '#0891b2',
  },
  violet: {
    border: 'rgba(107,47,255,.18)',
    hoverBorder: 'rgba(107,47,255,.38)',
    hoverBg: 'rgba(107,47,255,.06)',
    glow: '#6B2FFF',
    valDark: '#9B6FFF',
    valLight: '#7c3aed',
  },
  green: {
    border: 'rgba(0,232,122,.12)',
    hoverBorder: 'rgba(0,232,122,.28)',
    hoverBg: 'rgba(0,232,122,.06)',
    glow: '#00E87A',
    valDark: '#00E87A',
    valLight: '#059669',
  },
  pink: {
    border: 'rgba(236,72,153,.15)',
    hoverBorder: 'rgba(236,72,153,.35)',
    hoverBg: 'rgba(236,72,153,.06)',
    glow: '#ec4899',
    valDark: '#f472b6',
    valLight: '#db2777',
  },
};

const ensureArray = (value) => (Array.isArray(value) ? value : []);

export default function Statistics({ setCategory }) {
  const user = useAuthStore((state) => state.user);
  const reviews = useReviewStore((state) => state.reviews);
  const wishlistCount = useWishlistStore((state) => state.wishlistIds).length;
  const orderCount = useOrderStore((state) => state.orders.length);
  const reviewCount =
    ensureArray(reviews).length > 0 ? ensureArray(reviews).length : ensureArray(user?.reviewList).length;

  const statistics = [
    {
      key: 'order',
      variant: 'cyan',
      icon: <ThunderIcon />,
      value: orderCount || 0,
      label: 'TOTAL ORDERS',
      category: 'order',
    },
    {
      key: 'wish',
      variant: 'pink',
      icon: <HeartFillIcon />,
      value: wishlistCount || 0,
      label: 'WISHLIST',
      category: 'wish',
    },
    {
      key: 'review',
      variant: 'blue',
      icon: <ReviewFillIcon />,
      value: reviewCount.toLocaleString(),
      label: 'REVIEW ',
      category: 'review',
    },
    {
      key: 'coupon',
      variant: 'violet',
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
            $variant={item.variant}
            $c={VARIANT_COLORS[item.variant]}
            as="button"
            onClick={() => setCategory?.(item.category)}
            aria-label={`${item.label} 보기`}
          >
            <StatGlow $c={VARIANT_COLORS[item.variant]} />
            <StatWrap>
              <StatisticsCount className="statistics-count" $variant={item.variant}>
                {item.value}
              </StatisticsCount>
              <StatIcon $variant={item.variant}>{item.icon}</StatIcon>
            </StatWrap>
            <StatisticsLabel>{item.label}</StatisticsLabel>
          </StatisticsItem>
        ))}
      </StatisticsList>
    </StatisticsWrap>
  );
}

const StatWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 4px;
`;
const StatisticsWrap = styled.div`
  padding: ${({ theme }) => theme.spacing[6]} 0 0;
  padding-inline: ${({ theme }) => theme.grid.margin};
  width: 100%;
  box-sizing: border-box;
`;

const StatisticsList = styled.ul`
  box-sizing: border-box;
  width: 100%;
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 10px;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (max-width: 400px) {
    grid-template-columns: 1fr;
    gap: ${({ theme }) => theme.spacing[2]};
  }
`;

const StatisticsCount = styled.p`
  display: inline-block;
  font-family: ${({ theme }) => theme.fontFamily.mono};
  font-size: ${({ theme }) => theme.fontSize.m};
  font-weight: 600;
  line-height: 1;
  margin-bottom: ${({ theme }) => theme.spacing[2]};
  background: ${({ $variant, theme }) => {
    const isDark = theme.mode === 'dark';
    const c = VARIANT_COLORS[$variant];
    const base = isDark ? c.valDark : c.valLight;
    return `linear-gradient(135deg, ${base}, ${base}aa)`;
  }};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  transition: background 0.2s ease;
`;

const StatisticsItem = styled.li`
  min-width: 0;
  padding: 16px 18px;
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  text-align: left;
  background: ${({ theme }) => theme.colors.cardBgLight};
  border: 1px solid ${({ $c }) => $c.border};
  border-radius: ${({ theme }) => theme.radii.md};
  cursor: pointer;
  transition:
    border-color 0.2s,
    transform 0.2s,
    background 0.2s;

  &:hover {
    transform: translateY(-2px);

    border-color: ${({ $c }) => $c.hoverBorder};
    background: ${({ $c, theme }) => `color-mix(in srgb, ${theme.colors.cardBg} 85%, ${$c.glow})`};
  }

  &:hover .statistics-count {
    background: ${({ $c, theme }) => {
      const accent = theme.mode === 'light' ? $c.valLight : $c.valDark;
      return `linear-gradient(135deg, ${theme.colors.text} 0%, ${accent} 100%)`;
    }};
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
`;

const StatGlow = styled.div`
  position: absolute;
  width: 70px;
  height: 70px;
  border-radius: 50%;
  top: -18px;
  right: -18px;
  background: ${({ $c }) => $c.glow};
  filter: blur(26px);
  opacity: 0.2;
  pointer-events: none;
`;

const StatIcon = styled.span`
  display: block;
  margin-bottom: 12px;
  line-height: 1;
  color: ${({ $variant, theme }) => {
    const isDark = theme.mode === 'dark';
    return isDark ? VARIANT_COLORS[$variant].valDark : VARIANT_COLORS[$variant].valLight;
  }};

  svg {
    width: 16px;
    height: 16px;
    opacity: 0.85;
  }
`;

const StatisticsLabel = styled.span`
  font-family: ${({ theme }) => theme.fontFamily.mono};
  font-size: ${({ theme }) => theme.fontSize.xxxs};
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.textSecondary};
`;
