import React from 'react';
import styled from '@emotion/styled';

export default function ProductCareOption({ product, isChecked, onToggle }) {
  const CARE_DISCOUNT_RATE = 20;

  
  
  const careService = product.additionalServices?.[0];
  if (!careService) return null;
  const originalPrice = Math.round(careService.price / (1 - CARE_DISCOUNT_RATE / 100));
  return (
    <Wrapper>
      <CareCard $checked={isChecked} onClick={() => onToggle(!isChecked)}>
        <CareContent>
          <CareTitleRow>
            <Checkbox type="checkbox" checked={isChecked} onChange={() => {}} />
            <CareTitle>
              {careService.title}+ {product.type}
            </CareTitle>
          </CareTitleRow>
          <CareDesc>{careService.desc}</CareDesc>

          <CarePriceRow>
            <Priced>
              <OriginalPrice>{originalPrice.toLocaleString()}원</OriginalPrice>
              <span>20%↓</span> + {careService.price.toLocaleString()}원
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
  gap: ${({ theme }) => theme.spacing[4]};
  width: 100%;
  margin-top: ${({ theme }) => theme.spacing[1]};
  padding: 18px 20px;
  border-radius: 20px;
  cursor: pointer;
  border: 1px solid
    ${({ $checked, theme }) => ($checked ? theme.btn.secondaryBorder : theme.input.lineBorder)};
  background: ${({ theme }) => theme.btn.secondaryBg};
  box-shadow: ${({ $checked, theme }) =>
    $checked
      ? `
        0 0 0 1.5px ${theme.colors.textSecondary},
        0 0 0 4px ${theme.colors.electricViolet ?? theme.colors.primary}33,
        inset 0 1px 3px rgba(255,255,255,0.08)
      `
      : 'none'};
  transition:
    border-color ${({ theme }) => theme.motion.fast},
    box-shadow ${({ theme }) => theme.motion.fast},
    transform ${({ theme }) => theme.motion.fast};

  &:active {
    transform: scale(0.985);
  }
`;

const CheckboxRow = styled.div`
  display: flex;
  justify-content: center;
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
  background: ${({ theme }) => theme.colors.primary}18;
  transition:
    background ${({ theme }) => theme.motion.fast},
    box-shadow ${({ theme }) => theme.motion.fast},
    border-color ${({ theme }) => theme.motion.fast};

  &:checked {
    background: ${({ theme }) => theme.gradients.navActive};
    box-shadow:
      0 0 0 1px ${({ theme }) => theme.colors.textSecondary},
      0 0 0 3px ${({ theme }) => theme.colors.electricViolet ?? theme.colors.primary}33;
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

const CareTitleRow = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[3]};
`;

const CareContent = styled.div`
  display: flex;
  flex-direction: column;
`;

const CareTitle = styled.p`
  font-size: ${({ theme }) => theme.fontSize.s};
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
`;

const CareDesc = styled.p`
  margin: 0;
  padding-left: calc(18px + ${({ theme }) => theme.spacing[3]});
  font-weight: 700;
  font-size: ${({ theme }) => theme.fontSize.xxs};
  color: ${({ theme }) => theme.colors.textSecondary};
`;

const CarePriceRow = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  padding-left: calc(18px + ${({ theme }) => theme.spacing[3]});
  margin-top: 8px;
`;

const Discount = styled.span`
  font-size: ${({ theme }) => theme.fontSize.xxs};
  color: ${({ theme }) => theme.colors.accent};
`;

const OriginalPrice = styled.span`
  text-decoration: line-through;
  color: ${({ theme }) => theme.colors.textSecondary};
  opacity: 0.6;
  font-size: ${({ theme }) => theme.fontSize.xxs};
  margin-right: 4px;
`;

const Priced = styled.span`
  font-size: ${({ theme }) => theme.fontSize.xs};
  font-weight: 700;
  color: ${({ theme }) => theme.colors.primary};
  > span:nth-of-type(2) {
    font-size: ${({ theme }) => theme.fontSize.xxs};
    color: ${({ theme }) => theme.colors.accent};
    margin-right: 4px;
    font-weight: 700;
    font-family: ${({ theme }) => theme.fontFamily.mono};
  }
`;
