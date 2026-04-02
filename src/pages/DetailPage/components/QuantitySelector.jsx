import React from 'react';
import styled from '@emotion/styled';
import { MinusIcon, QtyPlusIcon } from '../../../assets/icons/BtnIcon';

export default function QuantitySelector({ quantity, onDecrease, onIncrease }) {
  return (
    <OptionBox>
      <QuantityButton type="button" onClick={onDecrease} disabled={quantity <= 1}>
        <MinusIcon size={16} />
      </QuantityButton>

      <QuantityValue>{quantity}</QuantityValue>

      <QuantityButton type="button" onClick={onIncrease}>
        <QtyPlusIcon size={16} />
      </QuantityButton>
    </OptionBox>
  );
}

const OptionBox = styled.div`
  margin-top: ${({ theme }) => theme.spacing[8]};
  width: 100%;
  height: 46px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 100px;
  background: ${({ theme }) => theme.colors.cardBg};
  border: 1px solid ${({ theme }) => theme.colors.cardBorder};
  backdrop-filter: ${({ theme }) => theme.effects.blurSoft};
  overflow: hidden;
`;

const QuantityButton = styled.button`
  width: 55px;
  height: 55px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.primary};
  transition:
    background-color ${({ theme }) => theme.motion.fast},
    box-shadow ${({ theme }) => theme.motion.fast},
    color ${({ theme }) => theme.motion.fast},
    opacity ${({ theme }) => theme.motion.fast};

  > svg {
    transition: transform ${({ theme }) => theme.motion.fast};
  }

  &:hover:not(:disabled) {
    background: ${({ theme }) => theme.colors.primary + '18'};
  }

  &:active:not(:disabled) {
    background: ${({ theme }) => theme.colors.primary + '22'};
    box-shadow: none;

    > svg {
      transform: scale(0.84);
    }
  }

  &:disabled {
    cursor: default;
    color: ${({ theme }) => theme.colors.textSecondary};
    opacity: 0.55;
    background: transparent;

    > svg {
      transform: none;
    }
  }
`;

const QuantityValue = styled.span`
  min-width: 24px;
  text-align: center;
  font-size: ${({ theme }) => theme.fontSize.xs};
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
`;
