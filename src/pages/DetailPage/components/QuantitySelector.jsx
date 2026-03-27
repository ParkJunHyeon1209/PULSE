import React from 'react';
import styled from '@emotion/styled';

export default function QuantitySelector({ quantity, onDecrease, onIncrease }) {
  return (
    <OptionBox>
      <QuantityButton type="button" onClick={onDecrease}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          class="bi bi-dash"
          viewBox="0 0 16 16"
        >
          <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8" />
        </svg>
      </QuantityButton>

      <QuantityValue>{quantity}</QuantityValue>

      <QuantityButton type="button" onClick={onIncrease}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          class="bi bi-plus"
          viewBox="0 0 16 16"
        >
          <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4" />
        </svg>
      </QuantityButton>
    </OptionBox>
  );
}

const OptionBox = styled.div`
  margin-top: ${({ theme }) => theme.spacing[5]};
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
