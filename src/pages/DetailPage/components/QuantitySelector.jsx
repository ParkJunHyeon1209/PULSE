import React from 'react';
import styled from '@emotion/styled';

export default function QuantitySelector({ quantity, onDecrease, onIncrease }) {
  return (
    <OptionBox>
      <QuantityButton type="button" onClick={onDecrease}>
        -
      </QuantityButton>

      <QuantityValue>{quantity}</QuantityValue>

      <QuantityButton type="button" onClick={onIncrease}>
        +
      </QuantityButton>
    </OptionBox>
  );
}

const OptionBox = styled.div`
  width: 100%;
  height: 38px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${({ theme }) => `${theme.spacing[2]} ${theme.spacing[4]}`};
  border-radius: 100px;
  background: ${({ theme }) => theme.colors.cardBg};
  border: 1px solid ${({ theme }) => theme.colors.cardBorder};
  backdrop-filter: ${({ theme }) => theme.effects.blurSoft};
`;

const QuantityButton = styled.button`
  width: 30px;
  height: 30px;
  color: ${({ theme }) => theme.colors.text};
  font-size: ${({ theme }) => theme.fontSize.xs};
  font-weight: 400;
  transition:
    background-color ${({ theme }) => theme.motion.fast},
    transform ${({ theme }) => theme.motion.fast},
    box-shadow ${({ theme }) => theme.motion.fast};

  &:hover {
    background: ${({ theme }) => theme.btn.secondaryHoverBg};
    box-shadow: ${({ theme }) => theme.btn.secondaryHoverShadow};
    transform: translateY(-1px);
  }
`;

const QuantityValue = styled.span`
  min-width: 24px;
  text-align: center;
  font-size: ${({ theme }) => theme.fontSize.xs};
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
`;
