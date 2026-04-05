import styled from '@emotion/styled';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import BaseBtn from '../../../../components/common/BaseBtn';
import { CartIcon, HeartIcon, ReviewIcon } from '../../../../assets/icons/BtnIcon';

const VARIANT_COLORS = {
  order: {
    border: 'rgba(0,212,255,.15)',
    hoverBorder: 'rgba(0,212,255,.35)',
    glow: '#00D4FF',
    valDark: '#00D4FF',
    valLight: '#0891b2',
  },
  wish: {
    border: 'rgba(236,72,153,.15)',
    hoverBorder: 'rgba(236,72,153,.35)',
    glow: '#ec4899',
    valDark: '#f472b6',
    valLight: '#db2777',
  },
  review: {
    border: 'rgba(0,76,255,.18)',
    hoverBorder: 'rgba(0,76,255,.38)',
    glow: '#004CFF',
    valDark: '#4D85FF',
    valLight: '#2563eb',
  },
  coupon: {
    border: 'rgba(107,47,255,.18)',
    hoverBorder: 'rgba(107,47,255,.38)',
    glow: '#6B2FFF',
    valDark: '#9B6FFF',
    valLight: '#7c3aed',
  },
};

const DEFAULT_VARIANT = VARIANT_COLORS.review;

export default function MyPageEmptyState({
  category,
  title,
  description,
  buttonLabel = 'EXPLORE GEAR',
  to = '/categories',
}) {
  const navigate = useNavigate();
  const c = VARIANT_COLORS[category] ?? DEFAULT_VARIANT;

  return (
    <EmptyStateWrap $c={c}>
      <EmptyGlow $c={c} />
      {category === 'order' ? (
        <CartIcon size={'80px'} />
      ) : category === 'wish' ? (
        <HeartIcon size={'80px'} />
      ) : (
        <ReviewIcon size={'80px'} />
      )}
      <p>{title}</p>
      <p>{description}</p>
      <EmptyBtn
        $c={c}
        onClick={() => navigate(to)}
        variant="secondary"
        icon={false}
        padding="6px 24px"
        height="42px"
      >
        {buttonLabel}
      </EmptyBtn>
    </EmptyStateWrap>
  );
}

const EmptyStateWrap = styled.div`
  width: 100%;
  min-height: 420px;
  padding: ${({ theme }) => theme.spacing[18]} ${({ theme }) => theme.spacing[10]};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  white-space: pre-wrap;
  position: relative;
  overflow: hidden;
  border: 1px solid ${({ $c }) => $c.border};
  border-radius: ${({ theme }) => theme.radii.lg};
  background: ${({ theme }) => theme.colors.cardBgLight};

  > svg {
    width: 80px;
    height: 80px;
    margin-bottom: ${({ theme }) => theme.spacing[5]};
    color: ${({ $c, theme }) => (theme.mode === 'dark' ? $c.valDark : $c.valLight)};
    opacity: 0.45;
  }

  > p:first-of-type {
    margin-bottom: ${({ theme }) => theme.spacing[3]};
    font-size: ${({ theme }) => theme.fontSize.xs};
    font-weight: 700;
    color: ${({ theme }) => theme.colors.text};
  }

  > p:last-of-type {
    margin-bottom: ${({ theme }) => theme.spacing[6]};
    font-size: ${({ theme }) => theme.fontSize.xxxs};
    color: ${({ theme }) => theme.colors.textSecondary};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    min-height: 360px;
    padding: ${({ theme }) => theme.spacing[14]} ${({ theme }) => theme.spacing[6]};
  }

  @media (max-width: 400px) {
    padding: ${({ theme }) => theme.spacing[12]} ${({ theme }) => theme.spacing[4]};
  }
`;

const EmptyGlow = styled.div`
  position: absolute;
  width: 180px;
  height: 180px;
  border-radius: 50%;
  top: -60px;
  right: -60px;
  background: ${({ $c }) => $c.glow};
  filter: blur(60px);
  opacity: 0.12;
  pointer-events: none;
`;

const EmptyBtn = styled(BaseBtn)`
  flex: none;
  border: 1px solid ${({ $c }) => $c.border};
  background: ${({ $c }) => $c.glow}18;
  box-shadow: 0 0 9px ${({ $c }) => $c.glow}20;

  > span {
    font-size: ${({ theme }) => theme.fontSize.xxxs};
    color: ${({ $c, theme }) => (theme.mode === 'dark' ? $c.valDark : $c.valLight)};
  }

  &:hover:not(:disabled) {
    border-color: ${({ $c }) => $c.hoverBorder};
    background: ${({ $c }) => $c.glow}32;
    box-shadow: 0 0 18px ${({ $c }) => $c.glow}40;
  }
`;
