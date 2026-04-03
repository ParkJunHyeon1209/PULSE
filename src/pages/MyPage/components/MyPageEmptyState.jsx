import styled from '@emotion/styled';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import BaseBtn from '../../../components/common/BaseBtn';
import useThemeStore from '../../../store/useThemeStore';
import { CartIcon, HeartIcon, ReviewIcon } from '../../../assets/icons/BtnIcon';

export default function MyPageEmptyState({
  category,
  title,
  description,
  buttonLabel = 'EXPLORE GEAR',
  to = '/categories',
}) {
  const navigate = useNavigate();
  const isDarkMode = useThemeStore((state) => state.isDarkMode);

  return (
    <EmptyStateWrap $isDarkMode={isDarkMode}>
      {category === 'order' ? (
        <CartIcon size={'80px'} />
      ) : category === 'wish' ? (
        <HeartIcon size={'80px'} />
      ) : (
        <ReviewIcon size={'80px'} />
      )}
      <p>{title}</p>
      <p>{description}</p>
      <BaseBtn onClick={() => navigate(to)} variant="secondary" tone="violet" padding="12px 24px">
        {buttonLabel}
      </BaseBtn>
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
  border: 1px solid ${({ theme }) => theme.checkbox.border + '35'};
  border-radius: ${({ theme }) => theme.radii.lg};
  background-color: ${({ theme }) => theme.colors.cardBg};
  box-shadow: 0 1px 20px ${({ theme }) => theme.checkbox.border + '18'};

  > img {
    width: 150px;
    margin-bottom: ${({ theme }) => theme.spacing[5]};
    opacity: ${({ $isDarkMode }) => ($isDarkMode ? 0.2 : 0.8)};
  }

  > svg {
    width: 80px;
    height: 80px;
    margin-bottom: ${({ theme }) => theme.spacing[5]};
    color: ${({ theme }) => theme.colors.primary};
    opacity: ${({ $isDarkMode }) => ($isDarkMode ? 0.4 : 0.45)};
  }

  > p:first-of-type {
    margin-bottom: ${({ theme }) => theme.spacing[4]};
    font-size: ${({ theme }) => theme.fontSize.s};
    font-weight: 700;
    color: ${({ theme }) => theme.colors.textPrimary};
  }

  > p:last-of-type {
    margin-bottom: ${({ theme }) => theme.spacing[6]};
    color: ${({ theme }) => theme.colors.textSecondary};
    line-height: 1.6;
  }

  > button {
    border: 1px solid ${({ theme }) => theme.colors.primary + '20'};
    background-color: ${({ theme }) => theme.colors.primary + '15'};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    min-height: 360px;
    padding: ${({ theme }) => theme.spacing[14]} ${({ theme }) => theme.spacing[6]};
  }

  @media (max-width: 400px) {
    padding: ${({ theme }) => theme.spacing[12]} ${({ theme }) => theme.spacing[4]};
  }
`;
