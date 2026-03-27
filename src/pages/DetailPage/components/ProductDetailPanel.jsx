import React, { useState } from 'react';
import styled from '@emotion/styled';
import BaseBtn from '../../../components/common/BaseBtn';
import ProductOptions from './ProductOptions';
import ProductCareOption from './ProductCareOption';
import QuantitySelector from './QuantitySelector';
import PurchaseActions from './PurchaseActions';
import { CardWish } from '../../../components/common/CardParts';

export default function ProductDetailPanel({
  product,
  quantity,
  selectedOptions,
  isCareChecked,
  onSelectOption,
  onToggleCare,
  onDecrease,
  onIncrease,
  onAddToCart,
}) {
  const [isLiked, setIsLiked] = useState(false);

  const handleToggleLike = () => {
    setIsLiked((prev) => !prev);
  };
  // id 311부터는 빠진 정보가 많음
  const logisticsInfo = product.logisticsInfo ?? {};

  return (
    <InfoSection>
      <HeaderRow>
        <CategoryBadge>✦ {product.type}</CategoryBadge>
        <LikeButton
          type="button"
          variant="ic-btn"
          size="36px"
          flex="0 0 auto"
          icon={false}
          $isLiked={isLiked}
          onClick={handleToggleLike}
          aria-label="찜하기"
        >
          <svg
            width="15"
            height="13"
            viewBox="0 0 15 13"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12.6196 1.56989C12.3003 1.25052 11.9213 0.99717 11.5042 0.824318C11.087 0.651467 10.6399 0.5625 10.1883 0.5625C9.73675 0.5625 9.28962 0.651467 8.87246 0.824318C8.4553 0.99717 8.07628 1.25052 7.75706 1.56989L7.09456 2.23239L6.43206 1.56989C5.78725 0.925083 4.9127 0.562834 4.00081 0.562834C3.08891 0.562834 2.21436 0.925083 1.56956 1.56989C0.924749 2.2147 0.5625 3.08925 0.5625 4.00114C0.5625 4.91304 0.924749 5.78758 1.56956 6.43239L2.23206 7.09489L7.09456 11.9574L11.9571 7.09489L12.6196 6.43239C12.9389 6.11317 13.1923 5.73415 13.3651 5.31699C13.538 4.89983 13.6269 4.4527 13.6269 4.00114C13.6269 3.54959 13.538 3.10246 13.3651 2.68529C13.1923 2.26813 12.9389 1.88911 12.6196 1.56989Z"
              stroke="currentColor"
              strokeWidth="1.125"
            />
          </svg>
        </LikeButton>
      </HeaderRow>

      <Title>{product.title}</Title>
      <Price>₩{product.price.toLocaleString()}</Price>

      <DescWrap>
        <ProductMeta>
          {(product.priceBadges ?? []).map((badge, index) => (
            <span key={index}>{badge.text}</span>
          ))}
        </ProductMeta>

        <Description>{product.desc}</Description>
      </DescWrap>
      {/* api명세에 없음 ↓ */}
      <FeatureTagList>
        <TagButton $tone="mint">✔ 직로배송</TagButton>
        <TagButton $tone="violet">햅틱 피드백</TagButton>
        <TagButton $tone="blue">한정 수량</TagButton>
      </FeatureTagList>
      <ProductOptionsWrap>
        <ProductOptions
          options={product.options ?? []}
          selectedOptions={selectedOptions}
          onSelectOption={onSelectOption}
        />
      </ProductOptionsWrap>
      <ProductCareOption product={product} isCareChecked={isCareChecked} onToggle={onToggleCare} />

      <MetaInfo>
        <p>
          <span>배송비</span>
          <Free>{logisticsInfo.deliveryFee ?? '-'}</Free>
        </p>

        <p>
          <span>도착</span>
          <span>{logisticsInfo.expectedDispatch ?? '-'}</span>
        </p>

        <p>
          <span>할부</span>
          <span>{logisticsInfo.installment ?? '-'}</span>
        </p>
      </MetaInfo>

      <QuantitySelector quantity={quantity} onDecrease={onDecrease} onIncrease={onIncrease} />

      <PurchaseActions onAddToCart={onAddToCart} />
    </InfoSection>
  );
}

const InfoSection = styled.aside`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[2]};
  color: ${({ theme }) => theme.colors.text};
`;
const LikeButton = styled(CardWish)`
  position: static;
  top: auto;
  right: auto;
  opacity: 1;
  transform: translateY(0);
`;

const HeaderRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const CategoryBadge = styled.span`
  width: fit-content;
  color: ${({ theme }) => theme.colors.primary};
  font-size: ${({ theme }) => theme.fontSize.xxxs};
  font-weight: 400;
`;

const Title = styled.h1`
  font-size: ${({ theme }) => theme.fontSize.s};
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
`;

const Price = styled.p`
  font-size: ${({ theme }) => theme.fontSize.lg};
  font-weight: 400;
  line-height: 1;
  letter-spacing: 0;
  color: ${({ theme }) => theme.colors.success};
`;

const DescWrap = styled.div`
  margin-top: ${({ theme }) => theme.spacing[1]};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[5]};
`;
const ProductMeta = styled.p`
  font-size: ${({ theme }) => theme.fontSize.xxxs};
  color: ${({ theme }) => theme.colors.textSecondary};

  > span + span {
    position: relative;
    margin-left: 10px;
    padding-left: 10px;
  }

  > span + span::before {
    content: '';
    position: absolute;
    width: 2px;
    height: 2px;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    border-radius: 50%;
    background: currentColor;
  }
`;
const Description = styled.p`
  margin: 0;
  font-size: ${({ theme }) => theme.fontSize.xxs};
  color: ${({ theme }) => theme.colors.textSecondary};
`;

const FeatureTagList = styled.div`
  margin-top: ${({ theme }) => theme.spacing[3]};
  font-weight: 400;
  font-size: ${({ theme }) => theme.fontSize.xxxs};
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
`;
const ProductOptionsWrap = styled.div`
  margin-top: ${({ theme }) => theme.spacing[8]};
`;

const TagButton = styled.button`
  padding: 4px 10px;
  border-radius: 100px;

  background: ${({ $tone, theme }) => {
    if ($tone === 'violet') return `${theme.colors.primary}1A`;
    if ($tone === 'blue') return `${theme.colors.info}1A`;
    return `${theme.colors.success}1A`;
  }};

  border: 1px solid
    ${({ $tone, theme }) => {
      if ($tone === 'violet') return `${theme.colors.primary}40`;
      if ($tone === 'blue') return `${theme.colors.info}40`;
      return `${theme.colors.success}40`;
    }};

  color: ${({ $tone, theme }) => {
    if ($tone === 'violet') return theme.colors.primary;
    if ($tone === 'blue') return theme.colors.info;
    return theme.colors.success;
  }};
`;

const MetaInfo = styled.div`
  margin-top: ${({ theme }) => theme.spacing[3]};
  display: flex;
  flex-direction: column;
  gap: 10px;

  p {
    display: flex;
    gap: 16px;
    font-size: ${({ theme }) => theme.fontSize.xxxs};
    line-height: 1.5;
    margin: 0;
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
