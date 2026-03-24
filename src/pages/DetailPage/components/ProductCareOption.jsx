import React from 'react';
import styled from '@emotion/styled';

export default function ProductCareOption({ product, isChecked, onToggle }) {
  const CARE_DISCOUNT_RATE = 20;

  const getDiscountedPrice = (price, discountRate) => {
    return Math.round(price * (1 - discountRate / 100));
  };

  return (
    <Wrapper>
      <CareCard $checked={isChecked}>
        <CheckboxRow>
          <Checkbox
            type="checkbox"
            checked={isChecked}
            onChange={(e) => onToggle(e.target.checked)}
          />
        </CheckboxRow>

        <CareContent>
          <CareTitle>PULSE CARE+ for {product.category}</CareTitle>
          <CareDesc>조이스틱 드리프트·파손·침수 보상 포함</CareDesc>

          <CarePriceRow>
            <Discount>{CARE_DISCOUNT_RATE}%↓</Discount>
            <Priced>
              {getDiscountedPrice(product.price, CARE_DISCOUNT_RATE).toLocaleString()}원
            </Priced>
          </CarePriceRow>
        </CareContent>
      </CareCard>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100%;
  position: relative;
  padding-bottom: 24px;

  &::after {
    content: '';
    position: absolute;
    width: 100%;
    height: 1px;
    left: 0;
    bottom: 0;
    background: ${({ theme }) => theme.Line};
  }
`;

const CareCard = styled.div`
  display: flex;
  align-items: flex-start;
  gap: ${({ theme }) => theme.spacing[4]};
  width: 100%;
  padding: 18px 20px;
  border-radius: 20px;
  border: 1px solid
    ${({ $checked, theme }) => ($checked ? theme.btn.secondaryBorder : theme.input.lineBorder)};
  background: ${({ theme }) => theme.btn.secondaryBg};
  box-shadow: ${({ $checked, theme }) => ($checked ? theme.btn.secondaryShadow : 'none')};
`;

const CheckboxRow = styled.div`
  flex-shrink: 0;
  padding-top: 2px;
`;

const Checkbox = styled.input`
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;

  position: relative;
  width: 18px;
  height: 18px;
  margin: 0;
  cursor: pointer;
  flex-shrink: 0;
  border-radius: 4px;
  border: 1px solid ${({ theme }) => theme.input.lineBorder};
  background: transparent;

  &:checked {
    background: ${({ theme }) => theme.gradients.navActive};
    box-shadow:
      0 0 0 1px #7c3aed,
      0 0 0 4px #7c3aed30;
    border: none;
  }
  &:checked::after {
    content: '✓';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -58%);
    font-size: 14px;
    font-weight: 700;
    color: white;
  }
`;

const CareContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const CareTitle = styled.p`
  font-size: ${({ theme }) => theme.fontSize.xs};
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
`;

const CareDesc = styled.p`
  margin: 0;
  font-size: ${({ theme }) => theme.fontSize.xxxs};
  color: ${({ theme }) => theme.colors.textSecondary};
`;

const CarePriceRow = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  margin-top: 8px;
`;

const Discount = styled.span`
  font-size: ${({ theme }) => theme.fontSize.xxs};
  color: ${({ theme }) => theme.colors.accent};
`;

const Priced = styled.span`
  font-size: ${({ theme }) => theme.fontSize.xxs};
  font-weight: 600;
  color: ${({ theme }) => theme.colors.primary};
`;
