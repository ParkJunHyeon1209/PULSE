import React, { useState } from 'react';
import styled from '@emotion/styled';

const InfoSection = styled.aside`
  padding: ${({ theme }) => `${theme.spacing[3]} ${theme.spacing[1]}`};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[5]};
  color: ${({ theme }) => theme.colors.text};
`;

const CategoryBadge = styled.span`
  width: fit-content;
  color: ${({ theme }) => theme.colors.secondary};
  font-size: ${({ theme }) => theme.fontSize.xs};
  font-weight: 700;
`;

const Title = styled.h1`
  margin: 0;
  font-size: ${({ theme }) => theme.fontSize.sm};
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
`;

const Price = styled.p`
  margin: 0;
  font-size: ${({ theme }) => theme.fontSize.xxl};
  font-weight: 400;
  line-height: 1;
  color: ${({ theme }) => theme.colors.success};
`;

const Description = styled.p`
  margin: 0;
  font-size: ${({ theme }) => theme.fontSize.xs};

  color: ${({ theme }) => theme.colors.textSecondary};
`;

const ProductMeta = styled.p`
  font-size: ${({ theme }) => theme.fontSize.xxxs};
  color: ${({ theme }) => theme.colors.textSecondary};
`;

const FeatureTagList = styled.div`
  font-weight: 400;
  font-size: ${({ theme }) => theme.fontSize.xxxs};
  display: flex;
  gap: 20px;

  > button:nth-of-type(2) {
    background: #7c3aed1a;
    border: 1px solid #7c3aed40;
    color: #7c3aed;
  }
  > button:nth-of-type(3) {
    background: #60a5fa1a;
    border: 1px solid #60a5fa40;
    color: #60a5fa;
  }
`;

const TagButton = styled.button`
  padding: 4px 10px;
  border-radius: 100px;
  background: #34d3991a;
  border: 1px solid #34d39940;
  color: #34d399;
`;

const Color = styled.p`
  padding-bottom: 12px;
  font-size: ${({ theme }) => theme.fontSize.xxxs};
  color: ${({ theme }) => theme.colors.textSecondary};
  span {
    color: #fff;
  }
`;

const ColorList = styled.div`
  display: flex;
  gap: 12px;
`;

const ColorButton = styled.button`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: ${({ $active, $color }) => ($active ? `2px solid ${$color}` : '2px solid transparent')};
  background-color: ${({ $color }) => $color};
  box-shadow: ${({ theme, $active, $color }) =>
    $active
      ? `
        0 0 0 3px ${theme.colors.textSecondary},
        0 0 0 6px ${$color}22,
        inset 0 2px 4px rgba(255,255,255,0.14),
        inset 0 -6px 10px rgba(0,0,0,0.2)
      `
      : `
        0 0 0 1px ${theme.colors.border},
        inset 0 2px 4px rgba(255,255,255,0.1),
        inset 0 -6px 10px rgba(0,0,0,0.18)
      `};
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 16px;
  font-weight: 700;
`;

const PlatformSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const PlatformLabel = styled(Color)`
  line-height: 1px;
`;

const PlatformList = styled(ColorList)``;

const PlatformButton = styled.button`
  padding: 8px 16px;
  border-radius: 12px;
  border: ${({ $active }) => ($active ? '1px solid #A78BFA' : '1px solid rgba(255,255,255,0.12)')};
  background: ${({ $active }) => ($active ? '#7C3AED1F' : 'transparent')};
  color: ${({ $active, theme }) => ($active ? theme.colors.white : theme.colors.textSecondary)};
  font-size: ${({ theme }) => theme.fontSize.xxxs};
`;

const ConnectionSection = styled(PlatformSection)``;
const ConnectionLabel = styled(Color)``;
const ConnectionList = styled(ColorList)``;
const ConnectionButton = styled(PlatformButton)`
  opacity: ${({ $soldOut }) => ($soldOut ? 0.45 : 1)};
  cursor: ${({ $soldOut }) => ($soldOut ? 'not-allowed' : 'pointer')};
  position: relative;
`;
const ConnectionText = styled.span`
  display: inline-block;
  text-decoration: ${({ $soldOut }) => ($soldOut ? 'line-through' : 'none')};
  text-decoration-thickness: 1.5px;
  text-decoration-color: currentColor;
`;

const SoldOutText = styled.span`
  font-size: ${({ theme }) => theme.fontSize.xxxs};
  color: ${({ theme }) => theme.colors.textSecondary};
  padding: 4px 10px;
  border-radius: 12px;
  position: absolute;
  top: 0px;
  right: 0px;
  transform: translateY(-50%) translateX(50%);
  color: ${({ theme }) => theme.colors.textSecondary};
  background-color: #000000;
`;

const CareLabel = styled.label`
  display: block;
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

const HiddenCheckbox = styled.input`
  position: absolute;
  opacity: 0;
  pointer-events: none;
`;

const CareCard = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 16px;
  width: 100%;
  padding: 18px 20px;
  border-radius: 20px;

  border: 1px solid
    ${({ $checked, theme }) => ($checked ? theme.btn.secondaryBorder : theme.input.lineBorder)};

  background: ${({ theme }) => theme.btn.secondaryBg};

  box-shadow: ${({ $checked, theme }) => ($checked ? theme.btn.secondaryShadow : 'none')};

  transition:
    border-color 0.2s ease,
    background-color 0.2s ease,
    box-shadow 0.2s ease;
`;

const CheckBoxUI = styled.div`
  flex-shrink: 0;
  width: 28px;
  height: 28px;
  border-radius: 9px;

  display: flex;
  align-items: center;
  justify-content: center;

  border: 1px solid
    ${({ $checked, theme }) => ($checked ? theme.btn.secondaryBorder : theme.input.lineBorder)};

  background: ${({ $checked, theme }) => ($checked ? theme.btn.secondaryBorder : 'transparent')};

  box-shadow: ${({ $checked, theme }) => ($checked ? theme.btn.secondaryShadow : 'none')};
  &:hover {
    background: ${({ theme }) => theme.btn.secondaryHoverBg};
    box-shadow: ${({ theme }) => theme.btn.secondaryHoverShadow};
  }
`;
const CheckMark = styled.span`
  font-size: 14px;
  line-height: 1;
  color: ${({ theme }) => theme.colors.white};
  opacity: ${({ $checked }) => ($checked ? 1 : 0)};
  transform: ${({ $checked }) => ($checked ? 'scale(1)' : 'scale(0.7)')};

  transition:
    opacity 0.2s ease,
    transform 0.2s ease;
`;

const CareContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const CareTitle = styled.p`
  font-size: ${({ theme }) => theme.fontSize.xs};
  font-weight: 600;
  color: ${({ theme }) => theme.colors.white};
`;

const CareDesc = styled.p`
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
  color: #ec4899;
`;
const Priced = styled.span`
  font-size: ${({ theme }) => theme.fontSize.xxs};
  font-weight: 600;
  color: #a78bfa;
`;

const MetaInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;

  p {
    display: flex;
    gap: 16px;
    font-size: ${({ theme }) => theme.fontSize.xxxs};
    line-height: 1.5;
  }

  p > span:first-of-type {
    flex-shrink: 0;
    min-width: 50px;
    color: ${({ theme }) => theme.colors.textSecondary};
  }
`;
const Free = styled.span`
  color: ${({ theme }) => theme.colors.success};
`;

const OptionBox = styled.div`
  width: 100%;
  height: 38px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${({ theme }) => `${theme.spacing[2]} ${theme.spacing[4]}`};
  border-radius: ${({ theme }) => theme.radii.lg};
  background: ${({ theme }) => theme.colors.cardBg};
  border: 1px solid ${({ theme }) => theme.colors.cardBorder};
  backdrop-filter: ${({ theme }) => theme.effects.blurSoft};
  border-radius: 100px;
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

const ButtonGroup = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing[3]};
`;

const BaseButton = styled.button`
  flex: 1;
  height: 38px;
  border: none;
  border-radius: ${({ theme }) => theme.radii.pill};
  font-size: ${({ theme }) => theme.fontSize.xs};
  font-weight: 800;
  transition:
    transform ${({ theme }) => theme.motion.fast},
    box-shadow ${({ theme }) => theme.motion.fast},
    background-color ${({ theme }) => theme.motion.fast},
    border-color ${({ theme }) => theme.motion.fast},
    color ${({ theme }) => theme.motion.fast};

  &:hover {
    transform: translateY(-2px);
  }
`;

const CartButton = styled(BaseButton)`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[3]};
  background: ${({ theme }) => theme.btn.secondaryBg};
  color: ${({ theme }) => theme.btn.secondaryColor};
  border: 1px solid ${({ theme }) => theme.btn.secondaryBorder};
  box-shadow: ${({ theme }) => theme.btn.secondaryShadow};

  &:hover {
    background: ${({ theme }) => theme.btn.secondaryHoverBg};
    color: ${({ theme }) => theme.btn.secondaryHoverColor};
    border-color: ${({ theme }) => theme.btn.secondaryHoverBorder};
    box-shadow: ${({ theme }) => theme.btn.secondaryHoverShadow};
  }
`;

const BuyButton = styled(BaseButton)`
  color: #ffffff;
  background: ${({ theme }) => theme.variants.violet.bg};
  box-shadow: ${({ theme }) => theme.variants.violet.shadow};

  &:hover {
    background: ${({ theme }) => theme.variants.violet.hoverBg};
    box-shadow: ${({ theme }) => theme.variants.violet.hoverShadow};
  }
`;

export default function ProductDetailPanel({
  product,
  quantity,
  onDecrease,
  onIncrease,
  onAddToCart,
}) {
  const [selectedColor, setSelectedColor] = useState(product.colors[0].name);

  const [selectedPlatform, setSelectedPlatform] = useState(product.platforms[0]);

  const [selectedConnection, setSelectedConnection] = useState(product.connections[0].id);

  const [isChecked, setIsChecked] = useState(false);

  // 할인가
  const CARE_DISCOUNT_RATE = 20;
  const getDiscountedPrice = (price, discountRate) => {
    return Math.round(price * (1 - discountRate / 100));
  };
  // 무이자
  const getMonthlyInstallment = (price, months) => {
    return Math.floor(price / months);
  };
  return (
    <InfoSection>
      <div>
        <CategoryBadge>✦ {product.category}</CategoryBadge>
        <button></button>
      </div>
      <Title>{product.title}</Title>
      <Price>₩{product.price.toLocaleString()}</Price>
      <Description>{product.description}</Description>
      <ProductMeta>
        <span>VAT 포함</span>
        <span>무료 배송</span>
        <span>한정판</span>
      </ProductMeta>
      <FeatureTagList>
        <TagButton>✔ 직로배송</TagButton>
        <TagButton>햅틱 피드백</TagButton>
        <TagButton>한정 수량</TagButton>
      </FeatureTagList>

      <div>
        <Color>
          색상 : <span>{selectedColor}</span>
        </Color>
        <ColorList>
          {product.colors.map((color) => (
            <ColorButton
              key={color.name}
              $active={selectedColor === color.name}
              $color={color.value}
              onClick={() => setSelectedColor(color.name)}
            >
              {selectedColor === color.name ? '✓' : ''}
            </ColorButton>
          ))}
        </ColorList>
      </div>
      <PlatformSection>
        <PlatformLabel>플랫폼</PlatformLabel>
        <PlatformList>
          {product.platforms.map((platform) => (
            <PlatformButton
              key={platform}
              type="button"
              $active={selectedPlatform === platform}
              onClick={() => setSelectedPlatform(platform)}
            >
              {platform}
            </PlatformButton>
          ))}
        </PlatformList>
      </PlatformSection>

      <ConnectionSection>
        <ConnectionLabel>연결</ConnectionLabel>
        <ConnectionList>
          {product.connections.map((connection) => (
            <ConnectionButton
              key={connection.id}
              type="button"
              disabled={connection.soldOut}
              $active={selectedConnection === connection.id}
              $soldOut={connection.soldOut}
              onClick={() => setSelectedConnection(connection.id)}
            >
              <ConnectionText $soldOut={connection.soldOut}>{connection.label}</ConnectionText>
              {connection.soldOut && <SoldOutText $soldOut={connection.soldOut}>품절</SoldOutText>}
            </ConnectionButton>
          ))}
        </ConnectionList>
      </ConnectionSection>
      <CareLabel>
        <HiddenCheckbox
          type="checkbox"
          checked={isChecked}
          onChange={(e) => setIsChecked(e.target.checked)}
        />

        <CareCard $checked={isChecked}>
          <CheckBoxUI $checked={isChecked}>
            <CheckMark $checked={isChecked}>✔</CheckMark>
          </CheckBoxUI>

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
      </CareLabel>
      <MetaInfo>
        <p>
          <span>배송비</span>
          <Free>무료배송</Free>
        </p>
        <p>
          <span>도착</span>
          <span>3일 이내 배송 시작</span>
        </p>
        <p>
          <span>할부</span>
          <span>
            최대 12개월 무이자 · 월{' '}
            {getMonthlyInstallment(getDiscountedPrice(product.price, CARE_DISCOUNT_RATE), 12)}원
          </span>
        </p>
      </MetaInfo>
      <OptionBox>
        <QuantityButton type="button" onClick={onDecrease}>
          -
        </QuantityButton>
        <QuantityValue>{quantity}</QuantityValue>
        <QuantityButton type="button" onClick={onIncrease}>
          +
        </QuantityButton>
      </OptionBox>

      <ButtonGroup>
        <CartButton type="button" onClick={onAddToCart}>
          <svg
            width="16"
            height="16"
            viewBox="0 0 13 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0.625 3.125L2.5 0.625H10L11.875 3.125M0.625 3.125V11.875C0.625 12.2065 0.756696 12.5245 0.991116 12.7589C1.22554 12.9933 1.54348 13.125 1.875 13.125H10.625C10.9565 13.125 11.2745 12.9933 11.5089 12.7589C11.7433 12.5245 11.875 12.2065 11.875 11.875V3.125M0.625 3.125H11.875M8.75 5.625C8.75 6.28804 8.48661 6.92393 8.01777 7.39277C7.54893 7.86161 6.91304 8.125 6.25 8.125C5.58696 8.125 4.95107 7.86161 4.48223 7.39277C4.01339 6.92393 3.75 6.28804 3.75 5.625"
              stroke="white"
              stroke-width="1.25"
            />
          </svg>
          장바구니 담기
        </CartButton>
        <BuyButton type="button">바로 구매</BuyButton>
      </ButtonGroup>
    </InfoSection>
  );
}
