import styled from '@emotion/styled';
import BaseBtn from '../../../components/common/BaseBtn';
import ProductOptions from './ProductOptions';
import ProductCareOption from './ProductCareOption';
import QuantitySelector from './QuantitySelector';
import PurchaseActions from './PurchaseActions';
import { CardWish } from '../../../components/common/CardParts';
import useWishlistStore from '../../../store/useWishlistStore';
import useAuthStore from '../../../store/useAuthStore';
import { HeartIcon } from '../../../assets/icons/BtnIcon';

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
  onRequireLogin,
}) {
  const isLogin = useAuthStore((state) => state.isLogin);

  const wishlistIds = useWishlistStore((state) => state.wishlistIds);
  const toggleWishlist = useWishlistStore((state) => state.toggleWishlist);

  const isLiked = isLogin && wishlistIds.includes(product.id);
  const handleToggleLike = () => {
    if (!isLogin) {
      onRequireLogin?.();
      return;
    }

    toggleWishlist(product.id);
  };
  
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
          <HeartIcon />
        </LikeButton>
      </HeaderRow>

      <Title>{product.title}</Title>
      <Price>
        {product.price.toLocaleString()}
        <span> 원</span>
      </Price>

      <DescWrap>
        <ProductMeta>
          {(product.priceBadges ?? []).map((badge, index) => (
            <span key={index}>{badge.text}</span>
          ))}
        </ProductMeta>

        <Description>{product.desc}</Description>
      </DescWrap>
      
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
      <ProductCareOption product={product} isChecked={isCareChecked} onToggle={onToggleCare} />

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

      <PurchaseActions
        product={product}
        quantity={quantity}
        onAddToCart={onAddToCart}
        onRequireLogin={onRequireLogin}
      />
    </InfoSection>
  );
}

const InfoSection = styled.aside`
  display: flex;
  flex-direction: column;
  
  color: ${({ theme }) => theme.colors.text};
`;
const LikeButton = styled(CardWish)`
  position: relative;
  
  top: 8px;
  right: auto;
  opacity: 1;
  transform: translateY(0);
  flex-shrink: 0;
  background-color: ${({ theme }) => theme.btn.secondaryBg};
  z-index: auto;

  &:hover:not(:disabled) {
    color:${({ theme }) => theme.iconBtn.wish.activeColor};
  }

  &:active:not(:disabled) {
    transform: scale(0.88);
  }
`;

const HeaderRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const CategoryBadge = styled.span`
  width: fit-content;
  color: ${({ theme }) => theme.colors.primary};
  font-size: ${({ theme }) => theme.fontSize.xs};
  font-weight: 600;
`;

const Title = styled.h2`
  font-family: ${({ theme }) => theme.fontFamily.display};
  letter-spacing: -0.04em;
  font-size: ${({ theme }) => theme.fontSize.sm};
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
`;

const Price = styled.p`
  padding: ${({ theme }) => theme.spacing[3]} 0 ${({ theme }) => theme.spacing[1]};
  font-size: ${({ theme }) => theme.fontSize.xl};
  font-weight: 700;
  line-height: 1;
  letter-spacing: 0.05em;
  color: ${({ theme }) => theme.colors.success};
  font-family: ${({ theme }) => theme.fontFamily.hero};
  line-height: 1.2;
  > span {
    display: inline-block;
    font-weight: 700;
    font-size: ${({ theme }) => theme.fontSize.m};
    transform: translate(2px, -2px);
  }
`;

const DescWrap = styled.div`
  margin-top: ${({ theme }) => theme.spacing[1]};
  display: flex;
  flex-direction: column;
  font-weight: 600;
  gap: ${({ theme }) => theme.spacing[4]};
  opacity: 0.8;
  transform: translateX(2px);
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
  font-weight: 700;
  font-size: ${({ theme }) => theme.fontSize.xxs};
  color: ${({ theme }) => theme.colors.textSecondary};
`;

const FeatureTagList = styled.div`
  margin-top: ${({ theme }) => theme.spacing[4]};
  font-weight: 400;
  font-size: ${({ theme }) => theme.fontSize.xxxs};
  display: flex;
  gap: ${({ theme }) => theme.spacing[2]};
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
  margin-top: ${({ theme }) => theme.spacing[5]};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[2]};
  font-weight: 600;

  p {
    display: flex;
    gap: 16px;
    align-items: center;
    font-size: ${({ theme }) => theme.fontSize.xxxs};
    line-height: 1.5;
    margin: 0;
  }

  p > span:first-of-type {
    flex-shrink: 0;
    min-width: 50px;
    color: ${({ theme }) => theme.colors.textSecondary};
    + span {
      font-size: ${({ theme }) => theme.fontSize.xxs};
    }
  }
`;

const Free = styled.span`
  color: ${({ theme }) => theme.colors.success};
`;
