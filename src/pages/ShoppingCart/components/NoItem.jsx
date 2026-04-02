import styled from '@emotion/styled';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import emptyCart from '../../../assets/emptyCart1.svg';
import BaseBtn from '../../../components/common/BaseBtn';
import useThemeStore from '../../../store/useThemeStore';

const NoItemWrap = styled.div`
  padding: ${({ theme }) => theme.spacing[24]} ${({ theme }) => theme.spacing[40]};
  width: 100%;
  min-height: 480px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  white-space: pre-wrap;
  background-color: ${({ theme }) => theme.colors.cardBg};
  > img {
    margin-bottom: ${({ theme }) => theme.spacing[5]};
    width: 150px;
    opacity: ${({ isDarkMode }) => (isDarkMode ? 0.2 : 0.8)};
  }
  > p {
    text-align: center;
  }
  > p:first-of-type {
    margin-bottom: ${({ theme }) => theme.spacing[4]};
  }

  > p:last-of-type {
    margin-bottom: ${({ theme }) => theme.spacing[6]};
  }
  > button {
    border: 1px solid ${({ theme }) => theme.colors.primary + '20'};
    background-color: ${({ theme }) => theme.colors.primary + '15'};
  }
`;

export default function NoItem() {
  const navigate = useNavigate();
  const isDarkMode = useThemeStore((state) => state.isDarkMode);

  return (
    <NoItemWrap isDarkMode={isDarkMode}>
      <img src={emptyCart} alt="빈 카트" />
      <p>카트가 비어 있습니다.</p>
      <p>{`아직 추가된 장비가 없습니다. \n당신의 PULSE를 찾아보세요.`}</p>
      <BaseBtn
        onClick={() => navigate('/categories')}
        variant="secondary"
        tone="violet"
        padding="12px 24px"
      >
        EXPLORE GEAR
      </BaseBtn>
    </NoItemWrap>
  );
}
